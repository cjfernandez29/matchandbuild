import { useEffect, useReducer, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EVENT } from '../config/event'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  FORMACION,
  FORMACION_FINAL,
  POSICIONES,
  ROLES,
  ROLE_HEX,
  type Role,
} from './constants'
import { gameReducer, initGameState } from './gameReducer'
import { TIMINGS } from './timings'
import Character from './Character'
import ConnectorLine, { type EstadoLinea } from './ConnectorLine'
import BlocksBuild from './BlocksBuild'
import WinBurst from './WinBurst'
import styles from './TeamBuilderGame.module.css'

interface Particula {
  x: number
  y: number
  vx: number
  vy: number
  vida: number
  color: string
  radio: number
}

function estiloSpot(personaje: Role | 'ceo'): React.CSSProperties {
  const pos = POSICIONES[personaje]
  return {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    '--spot-color': `var(--color-${personaje})`,
  } as React.CSSProperties
}

/**
 * Juego de reclutamiento: tablero isométrico (2D cenital en <768px),
 * máquina de estados con useReducer y cola de clicks. Click en un
 * candidato: la línea se enciende (dash-offset), el personaje viaja
 * al centro con estela de partículas (canvas único), se transforma
 * en C-level y se acomoda en formación. A 4/4 reclutados el equipo
 * se reagrupa al borde, la torre de bloques se construye y estalla
 * la celebración con la tarjeta final. Con prefers-reduced-motion
 * los viajes/confeti se sustituyen por fades (juego completable).
 */
function TeamBuilderGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initGameState)
  const reducedMotion = useReducedMotion()
  const { juego } = EVENT

  const construyendo = state.phase.name === 'building'
  const gano = state.phase.name === 'win'
  const enFinal = construyendo || gano

  const panelRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const registroRef = useRef<HTMLAnchorElement>(null)
  const charRefs = useRef<Partial<Record<Role, HTMLButtonElement | null>>>({})
  const motor = useRef<{ particulas: Particula[]; raf: number; emitiendo: Role | null }>({
    particulas: [],
    raf: 0,
    emitiendo: null,
  })

  // Tamaño del tablero en px de layout (pre-transform): los viajes se
  // animan con translate en el plano local del tablero (riesgo 1 del spec).
  const [boardSize, setBoardSize] = useState(0)
  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setBoardSize(el.offsetWidth))
    ro.observe(el)
    setBoardSize(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  /** Offset px del punto de origen de un personaje a otra posición del tablero. */
  const offset = (personaje: Role | 'ceo', destino: { x: number; y: number }) => ({
    x: ((destino.x - POSICIONES[personaje].x) / 100) * boardSize,
    y: ((destino.y - POSICIONES[personaje].y) / 100) * boardSize,
  })

  // Globo del recién llegado + reacción del CEO durante bubbleHold
  const [recienLlegado, setRecienLlegado] = useState<Role | null>(null)
  useEffect(() => {
    const ultimo = state.recruited[state.recruited.length - 1]
    if (!ultimo) {
      setRecienLlegado(null)
      return
    }
    setRecienLlegado(ultimo)
    const id = window.setTimeout(() => setRecienLlegado(null), TIMINGS.bubbleHold * 1000)
    return () => window.clearTimeout(id)
  }, [state.recruited])

  // Nudge de inactividad: tras nudgeAfter s en idle, un candidato
  // disponible al azar salta más fuerte y su globo pulsa más.
  const [nudgeRole, setNudgeRole] = useState<Role | null>(null)
  const [cicloNudge, setCicloNudge] = useState(0)
  useEffect(() => {
    if (reducedMotion || state.phase.name !== 'idle') {
      setNudgeRole(null)
      return
    }
    const disponibles = ROLES.filter((r) => !state.recruited.includes(r))
    if (disponibles.length === 0) return

    let apagar = 0
    const encender = window.setTimeout(() => {
      setNudgeRole(disponibles[Math.floor(Math.random() * disponibles.length)])
      apagar = window.setTimeout(() => {
        setNudgeRole(null)
        setCicloNudge((c) => c + 1) // re-arma el temporizador
      }, 1800)
    }, TIMINGS.nudgeAfter * 1000)

    return () => {
      window.clearTimeout(encender)
      window.clearTimeout(apagar)
    }
  }, [state.phase.name, state.recruited, reducedMotion, cicloNudge])

  // Estela de partículas del viaje: un solo canvas sobre el panel.
  // El bucle rAF sigue la posición proyectada del personaje en viaje
  // y se apaga solo cuando no queda nada que dibujar.
  useEffect(() => {
    motor.current.emitiendo =
      !reducedMotion && state.phase.name === 'recruiting' ? state.phase.role : null
    if (!motor.current.emitiendo) return

    const canvas = trailRef.current
    const panel = panelRef.current
    if (!canvas || !panel) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const paso = () => {
      const m = motor.current
      const rectPanel = panel.getBoundingClientRect()
      const ancho = Math.round(rectPanel.width * dpr)
      const alto = Math.round(rectPanel.height * dpr)
      if (canvas.width !== ancho || canvas.height !== alto) {
        canvas.width = ancho
        canvas.height = alto
      }

      if (m.emitiendo) {
        const el = charRefs.current[m.emitiendo]
        if (el) {
          const r = el.getBoundingClientRect()
          const cx = (r.left + r.width / 2 - rectPanel.left) * dpr
          const cy = (r.top + r.height * 0.6 - rectPanel.top) * dpr
          for (let i = 0; i < 2; i++) {
            m.particulas.push({
              x: cx + (Math.random() - 0.5) * 12 * dpr,
              y: cy + (Math.random() - 0.5) * 12 * dpr,
              vx: (Math.random() - 0.5) * 1.2 * dpr,
              vy: (Math.random() * 0.7 + 0.2) * dpr,
              vida: 1,
              color: ROLE_HEX[m.emitiendo],
              radio: (Math.random() * 2.5 + 1.5) * dpr,
            })
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      m.particulas = m.particulas.filter((p) => p.vida > 0)
      for (const p of m.particulas) {
        p.x += p.vx
        p.y += p.vy
        p.vida -= 0.035
        ctx.globalAlpha = Math.max(p.vida, 0)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (m.emitiendo || m.particulas.length > 0) {
        m.raf = requestAnimationFrame(paso)
      } else {
        m.raf = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    if (!motor.current.raf) motor.current.raf = requestAnimationFrame(paso)
  }, [state.phase, reducedMotion])

  useEffect(() => {
    const m = motor.current
    return () => cancelAnimationFrame(m.raf)
  }, [])

  const contador = state.recruited.length + 1 // el CEO ya está a bordo
  const textoCeo = recienLlegado
    ? juego.ceoReaccion.replace('{titulo}', juego.roles[recienLlegado].titulo)
    : juego.ceoBubbleIdle

  const transicionRegrupo = reducedMotion
    ? { duration: 0.05 }
    : { delay: TIMINGS.regroupDelay, duration: TIMINGS.regroup, ease: 'easeInOut' as const }

  const ceoOffset = enFinal ? offset('ceo', FORMACION_FINAL.ceo) : { x: 0, y: 0 }

  return (
    <div
      ref={panelRef}
      className={styles.panel}
      style={
        {
          '--t-bounce': `${TIMINGS.idleBounce}s`,
          '--t-breath': `${TIMINGS.idleBreath}s`,
        } as React.CSSProperties
      }
    >
      <p className={styles.hud} aria-live="polite">
        {juego.hudLabel}{' '}
        <motion.span
          key={contador}
          className={styles.hudContador}
          initial={reducedMotion ? false : { scale: 1.5 }}
          animate={{ scale: 1 }}
        >
          {contador}/5
        </motion.span>
      </p>

      {/* Texto de consola mientras se construye la torre */}
      {construyendo && (
        <p className={styles.console}>
          {juego.construyendo.replace(/…$/, '')}
          <span className={styles.dot}>.</span>
          <span className={`${styles.dot} ${styles.dot2}`}>.</span>
          <span className={`${styles.dot} ${styles.dot3}`}>.</span>
        </p>
      )}

      {/* Shake sutil del tablero al estampar el "¡WIN!" */}
      <motion.div
        className={styles.scene}
        animate={gano && !reducedMotion ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={
          gano && !reducedMotion
            ? { delay: TIMINGS.winStamp * 0.7, duration: 0.5 }
            : { duration: 0 }
        }
      >
        <div ref={boardRef} className={styles.board}>
          <svg
            className={styles.lines}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {ROLES.map((role) => {
              const estado: EstadoLinea =
                state.phase.name === 'recruiting' && state.phase.role === role
                  ? 'activa'
                  : state.recruited.includes(role)
                    ? 'reclutada'
                    : 'idle'
              return (
                <ConnectorLine key={role} role={role} estado={estado} reducida={reducedMotion} />
              )
            })}
          </svg>

          {/* Torre de bloques al centro (building y win) */}
          {enFinal && (
            <div className={styles.spot} style={estiloSpot('ceo')}>
              <div className={styles.mover}>
                <div className={styles.standUp}>
                  <BlocksBuild
                    reducida={reducedMotion}
                    onComplete={() => dispatch({ type: 'BUILD_DONE' })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* CEO */}
          <div className={styles.spot} style={estiloSpot('ceo')}>
            <div className={`${styles.platform} ${styles.platformCeo}`} aria-hidden="true" />
            <motion.div
              className={styles.mover}
              initial={false}
              animate={ceoOffset}
              transition={enFinal ? transicionRegrupo : { duration: 0 }}
            >
              <div className={styles.standUp}>
                <div className={styles.figure}>
                  {!enFinal && (
                    <motion.span
                      key={textoCeo}
                      className={styles.bubble}
                      initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {textoCeo}
                    </motion.span>
                  )}
                  <span
                    className={gano && !reducedMotion ? styles.avatarCelebra : styles.avatarBreath}
                    style={gano ? { animationDelay: '0.48s' } : undefined}
                  >
                    <Character role="ceo" gender={state.genders.ceo} />
                  </span>
                  <span className={styles.label}>CEO</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Candidatos */}
          {ROLES.map((role, indice) => {
            const rolCfg = juego.roles[role]
            const reclutado = state.recruited.includes(role)
            const viajando = state.phase.name === 'recruiting' && state.phase.role === role
            const enCola = state.queue.includes(role)
            const esperando = !reclutado && !viajando && !enCola

            const destino = reclutado && enFinal ? FORMACION_FINAL[role] : FORMACION[role]
            const desplazamiento =
              reclutado || viajando ? offset(role, destino) : { x: 0, y: 0 }

            const bubbleTexto = reclutado
              ? rolCfg.bubbleLlegada
              : viajando || enCola
                ? juego.candidatoBubbleGo
                : juego.candidatoBubbleIdle

            const bubbleClases = [styles.bubble]
            if (reclutado && recienLlegado !== role) bubbleClases.push(styles.bubbleTooltip)
            if (esperando) {
              bubbleClases.push(nudgeRole === role ? styles.bubbleNudge : styles.bubblePulse)
            }

            const avatarClase =
              gano && !reducedMotion
                ? styles.avatarCelebra
                : esperando
                  ? nudgeRole === role
                    ? styles.avatarNudge
                    : styles.avatarBounce
                  : undefined

            return (
              <div key={role} className={styles.spot} style={estiloSpot(role)}>
                <div className={styles.platform} aria-hidden="true">
                  {reclutado && <span className={styles.check}>✓</span>}
                </div>

                <motion.div
                  className={styles.mover}
                  initial={false}
                  animate={desplazamiento}
                  transition={
                    viajando
                      ? reducedMotion
                        ? { duration: 0.05 }
                        : { delay: TIMINGS.lineDash, duration: TIMINGS.travel, ease: 'anticipate' }
                      : reclutado && enFinal
                        ? transicionRegrupo
                        : { duration: 0 }
                  }
                  onAnimationComplete={() => {
                    if (viajando) dispatch({ type: 'TRAVEL_DONE', role })
                  }}
                >
                  <div className={styles.standUp}>
                    <motion.button
                      ref={(el) => {
                        charRefs.current[role] = el
                      }}
                      type="button"
                      className={`${styles.figure} ${styles.candidato}`}
                      aria-label={reclutado ? `${rolCfg.titulo} reclutado` : rolCfg.ariaLabel}
                      aria-disabled={reclutado || viajando || undefined}
                      tabIndex={reclutado ? -1 : 0}
                      onClick={() => dispatch({ type: 'CLICK_CANDIDATE', role })}
                      initial={false}
                      whileHover={
                        esperando && !reducedMotion ? { y: -6, scale: 1.05 } : undefined
                      }
                      animate={reclutado && !reducedMotion ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: TIMINGS.transformFlash }}
                    >
                      {/* Sin globos en building/win: taparían la torre */}
                      {!enFinal && (
                        <span className={bubbleClases.join(' ')}>{bubbleTexto}</span>
                      )}
                      {reclutado && recienLlegado === role && !reducedMotion && (
                        <motion.span
                          className={styles.flash}
                          aria-hidden="true"
                          initial={{ opacity: 0.85, scale: 0.3 }}
                          animate={{ opacity: 0, scale: 1.9 }}
                          transition={{ duration: TIMINGS.transformFlash }}
                        />
                      )}
                      <span
                        className={avatarClase}
                        style={gano ? { animationDelay: `${indice * 0.12}s` } : undefined}
                      >
                        <Character role={role} gender={state.genders[role]} cLevel={reclutado} />
                      </span>
                      <span className={styles.label}>
                        {reclutado ? rolCfg.titulo : rolCfg.etiqueta}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <canvas ref={trailRef} className={styles.trailCanvas} aria-hidden="true" />

      {/* Celebración: confeti + "¡WIN!" */}
      {gano && <WinBurst reducida={reducedMotion} />}

      {/* Tarjeta final sobre la escena */}
      {gano && (
        <motion.div
          className={styles.winCardWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0.3 : 1.3, duration: 0.45 }}
          onAnimationComplete={() => registroRef.current?.focus()}
        >
          <motion.div
            className={styles.winCard}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0.3 : 1.3, duration: 0.45 }}
          >
            <p className={styles.winTexto}>{juego.tarjetaFinal.texto}</p>
            <div className={styles.winBotones}>
              <a
                ref={registroRef}
                className={styles.btnRegistro}
                href={EVENT.urlRegistro}
                target="_blank"
                rel="noopener noreferrer"
              >
                {juego.tarjetaFinal.botonRegistro}
              </a>
              <button
                type="button"
                className={styles.btnReset}
                onClick={() => dispatch({ type: 'RESET' })}
              >
                {juego.tarjetaFinal.botonReset}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default TeamBuilderGame
