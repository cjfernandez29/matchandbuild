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
import { NIVELES_EDIFICIO, delayNivel } from './buildTimeline'
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

interface Pulso {
  color: string
  origen: { x: number; y: number }
  destino: { x: number; y: number }
  inicio: number
  duracion: number
}

function estiloSpot(personaje: Role | 'ceo'): React.CSSProperties {
  const pos = POSICIONES[personaje]
  return {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    '--spot-color': `var(--color-${personaje})`,
  } as React.CSSProperties
}

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
  const torreRef = useRef<HTMLDivElement>(null)
  const registroRef = useRef<HTMLAnchorElement>(null)
  const charRefs = useRef<Partial<Record<Role, HTMLButtonElement | null>>>({})
  const motor = useRef<{
    particulas: Particula[]
    pulsos: Pulso[]
    raf: number
    emitiendo: Role | null
  }>({
    particulas: [],
    pulsos: [],
    raf: 0,
    emitiendo: null,
  })

  const [boardSize, setBoardSize] = useState(0)
  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setBoardSize(el.offsetWidth))
    ro.observe(el)
    setBoardSize(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  const offset = (personaje: Role | 'ceo', destino: { x: number; y: number }) => ({
    x: ((destino.x - POSICIONES[personaje].x) / 100) * boardSize,
    y: ((destino.y - POSICIONES[personaje].y) / 100) * boardSize,
  })

  const [recienLlegado, setRecienLlegado] = useState<Role | null>(null)
  const [mostrarReaccionAleatorio, setMostrarReaccionAleatorio] = useState<string | null>(null)

  useEffect(() => {
    const ultimo = state.recruited[state.recruited.length - 1]
    if (!ultimo) {
      setRecienLlegado(null)
      setMostrarReaccionAleatorio(null)
      return
    }
    setRecienLlegado(ultimo)

    // Generar el mensaje aleatorio inmediatamente para evitar volver al inicial
    const reacciones = juego.ceoReaccionesAleatorias
    const aleatorio = reacciones[Math.floor(Math.random() * reacciones.length)]

    const id = window.setTimeout(() => {
      setRecienLlegado(null)
      setMostrarReaccionAleatorio(aleatorio)
    }, TIMINGS.bubbleHold * 1000)

    return () => window.clearTimeout(id)
  }, [state.recruited, juego.ceoReaccionesAleatorias])

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
        setCicloNudge((c) => c + 1)
      }, 1800)
    }, TIMINGS.nudgeAfter * 1000)

    return () => {
      window.clearTimeout(encender)
      window.clearTimeout(apagar)
    }
  }, [state.phase.name, state.recruited, reducedMotion, cicloNudge])

  useEffect(() => {
    const m = motor.current
    m.emitiendo = !reducedMotion && state.phase.name === 'recruiting' ? state.phase.role : null

    if (reducedMotion) return
    if (state.phase.name !== 'recruiting' && state.phase.name !== 'building') return

    const canvas = trailRef.current
    const panel = panelRef.current
    if (!canvas || !panel) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const paso = () => {
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

      const ahora = performance.now()
      m.pulsos = m.pulsos.filter((p) => ahora - p.inicio < p.duracion)
      for (const p of m.pulsos) {
        const t = Math.min((ahora - p.inicio) / p.duracion, 1)
        const arco = Math.sin(t * Math.PI) * 18 * dpr
        const cx = p.origen.x + (p.destino.x - p.origen.x) * t
        const cy = p.origen.y + (p.destino.y - p.origen.y) * t - arco
        for (let i = 0; i < 2; i++) {
          m.particulas.push({
            x: cx + (Math.random() - 0.5) * 6 * dpr,
            y: cy + (Math.random() - 0.5) * 6 * dpr,
            vx: (Math.random() - 0.5) * 0.4 * dpr,
            vy: (Math.random() - 0.5) * 0.4 * dpr,
            vida: 0.7,
            color: p.color,
            radio: (Math.random() * 2 + 1.2) * dpr,
          })
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

      if (m.emitiendo || m.particulas.length > 0 || m.pulsos.length > 0) {
        m.raf = requestAnimationFrame(paso)
      } else {
        m.raf = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    const asegurarLoop = () => {
      if (!m.raf) m.raf = requestAnimationFrame(paso)
    }
    asegurarLoop()

    let timers: number[] = []
    if (state.phase.name === 'building') {
      timers = ROLES.map((role) => {
        const indice = NIVELES_EDIFICIO.findIndex((n) => n.role === role)
        const delayMs = delayNivel(indice, reducedMotion) * 1000
        return window.setTimeout(() => {
          const elChar = charRefs.current[role]
          const elTorre = torreRef.current
          if (!elChar || !elTorre) {
            return
          }
          const rectPanel = panel.getBoundingClientRect()
          const rectChar = elChar.getBoundingClientRect()
          const rectTorre = elTorre.getBoundingClientRect()
          m.pulsos.push({
            color: ROLE_HEX[role],
            origen: {
              x: (rectChar.left + rectChar.width / 2 - rectPanel.left) * dpr,
              y: (rectChar.top + rectChar.height * 0.5 - rectPanel.top) * dpr,
            },
            destino: {
              x: (rectTorre.left - rectPanel.left) * dpr,
              y: (rectTorre.top - rectPanel.top) * dpr,
            },
            inicio: performance.now(),
            duracion: TIMINGS.contributePulse * 1000,
          })
          asegurarLoop()
        }, delayMs)
      })
    }

    return () => {
      timers.forEach(window.clearTimeout)
    }
  }, [state.phase, reducedMotion])

  useEffect(() => {
    const m = motor.current
    return () => cancelAnimationFrame(m.raf)
  }, [])

  const contador = state.recruited.length + 1
  const textoCeo = !state.recruited.length
    ? juego.ceoBubbleIdle
    : recienLlegado
      ? juego.ceoReaccion.replace('{titulo}', juego.roles[recienLlegado].titulo)
      : mostrarReaccionAleatorio || juego.ceoBubbleIdle

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
      <div className={styles.hudContainer}>
        {!enFinal && (
          <motion.div
            className={styles.ceoBubbleDisplay}
            key={textoCeo}
            initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className={styles.ceoBubbleText}>CEO: {textoCeo}</div>
          </motion.div>
        )}

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
      </div>

      {construyendo && (
        <p className={styles.console}>
          {juego.construyendo.replace(/…$/, '')}
          <span className={styles.dot}>.</span>
          <span className={`${styles.dot} ${styles.dot2}`}>.</span>
          <span className={`${styles.dot} ${styles.dot3}`}>.</span>
        </p>
      )}

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

          <div className={styles.spot} style={estiloSpot('ceo')}>
            {!enFinal && (
              <div className={`${styles.platform} ${styles.platformCeo}`} aria-hidden="true" />
            )}
            <motion.div
              className={styles.mover}
              initial={false}
              animate={ceoOffset}
              transition={enFinal ? transicionRegrupo : { duration: 0 }}
            >
              <div className={styles.standUp}>
                <div className={styles.figure}>
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
                    if (viajando) {
                      dispatch({ type: 'TRAVEL_DONE', role })
                    }
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
                      onClick={() => {
                        dispatch({ type: 'CLICK_CANDIDATE', role })
                      }}
                      initial={false}
                      whileHover={
                        esperando && !reducedMotion ? { y: -6, scale: 1.05 } : undefined
                      }
                      animate={reclutado && !reducedMotion ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: TIMINGS.transformFlash }}
                    >
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

          {enFinal && (
            <div ref={torreRef} className={styles.spot} style={estiloSpot('ceo')}>
              <div className={styles.mover}>
                <div className={styles.standUpTorre}>
                  <BlocksBuild
                    reducida={reducedMotion}
                    onComplete={() => dispatch({ type: 'BUILD_DONE' })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <canvas ref={trailRef} className={styles.trailCanvas} aria-hidden="true" />

      {gano && <WinBurst reducida={reducedMotion} />}

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
