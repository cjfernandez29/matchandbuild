import { motion } from 'framer-motion'
import { ROLE_HEX } from './constants'
import { TIMINGS } from './timings'
import { NIVELES_EDIFICIO, delayNivel } from './buildTimeline'
import styles from './BlocksBuild.module.css'

const LADO_H = 30 // alto de las caras laterales del cubo = paso de apilado
const BASE_Y = 178 // y local del nivel 0 (cimiento), igual en toda la torre

/** Cubo isométrico: cara superior plena + laterales sombreados. */
function Cubo({ color }: { color: string }) {
  return (
    <g>
      <path d="M36 0L72 18 36 36 0 18Z" fill={color} />
      <path d="M0 18L36 36V66L0 48Z" fill={color} />
      <path d="M0 18L36 36V66L0 48Z" fill="rgba(0,0,0,0.38)" />
      <path d="M36 36L72 18V48L36 66Z" fill={color} />
      <path d="M36 36L72 18V48L36 66Z" fill="rgba(0,0,0,0.16)" />
    </g>
  )
}

/** Ventanita iluminada sobre la cara derecha (sigue su inclinación isométrica). */
function Ventana({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x}
      y={y}
      width="7"
      height="7"
      rx="1.2"
      fill="#fff3c4"
      opacity={0.92}
      transform={`rotate(-27 ${x + 3.5} ${y + 3.5})`}
    />
  )
}

/** Puerta sobre la cara izquierda del cimiento. */
function Puerta() {
  return (
    <rect
      x="10"
      y="30"
      width="11"
      height="16"
      rx="1.5"
      fill="rgba(0,0,0,0.5)"
      transform="rotate(27 15.5 38)"
    />
  )
}

interface BlocksBuildProps {
  reducida: boolean
  /** Se dispara al asentarse el banderín → BUILD_DONE. */
  onComplete: () => void
}

/**
 * Edificio final: se arma piso por piso (cimiento con puerta, un
 * piso por rol con ventanas que se encienden, techo) coronado por un
 * letrero luminoso "STARTUP". Reusa NIVELES_EDIFICIO/delayNivel para
 * que TeamBuilderGame dispare el pulso de partículas de cada
 * personaje justo cuando su piso cae. Con prefers-reduced-motion
 * todo aparece con fades.
 */
function BlocksBuild({ reducida, onComplete }: BlocksBuildProps) {
  const ultimo = NIVELES_EDIFICIO.length - 1
  const tope = BASE_Y - ultimo * LADO_H // y local del vértice superior del techo
  const minY = tope - 58
  const alto = BASE_Y + 66 - minY
  const delaySign = delayNivel(NIVELES_EDIFICIO.length, reducida)

  console.log('[BlocksBuild] render', {
    reducida,
    niveles: NIVELES_EDIFICIO.map((n) => n.key),
    viewBox: `-26 ${minY} 124 ${alto}`,
    delaySign,
  })

  return (
    <svg className={styles.svg} viewBox={`-26 ${minY} 124 ${alto}`} aria-hidden="true">
      {NIVELES_EDIFICIO.map((nivel, i) => {
        const color = nivel.role ? ROLE_HEX[nivel.role] : '#1c2454'
        const delay = delayNivel(i, reducida)
        console.log('[BlocksBuild] nivel', nivel.key, { i, color, delay })
        return (
          <g key={nivel.key} transform={`translate(0 ${BASE_Y - i * LADO_H})`}>
            <motion.g
              initial={reducida ? { opacity: 0 } : { opacity: 0, y: -110 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reducida
                  ? { delay, duration: 0.25 }
                  : { delay, duration: TIMINGS.blockDrop, ease: 'backOut' }
              }
              onAnimationComplete={() => console.log('[BlocksBuild] piso asentado:', nivel.key)}
            >
              <Cubo color={color} />
              {i === 0 && <Puerta />}
            </motion.g>

            {/* Ventanas: se encienden apenas el piso se asienta */}
            {nivel.role && (
              <>
                <motion.g
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: delay + (reducida ? 0.15 : TIMINGS.blockDrop * 0.55),
                    duration: reducida ? 0.15 : TIMINGS.windowPop,
                    ease: 'backOut',
                  }}
                >
                  <Ventana x={45} y={27} />
                </motion.g>
                <motion.g
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: delay + (reducida ? 0.2 : TIMINGS.blockDrop * 0.55 + 0.08),
                    duration: reducida ? 0.15 : TIMINGS.windowPop,
                    ease: 'backOut',
                  }}
                >
                  <Ventana x={58} y={20} />
                </motion.g>
              </>
            )}
          </g>
        )
      })}

      {/* Letrero "STARTUP" en la cima: cierra la secuencia */}
      <motion.g
        className={styles.sign}
        initial={reducida ? { opacity: 0 } : { opacity: 0, y: -110 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducida
            ? { delay: delaySign, duration: 0.25 }
            : { delay: delaySign, duration: TIMINGS.blockDrop, ease: 'backOut' }
        }
        onAnimationComplete={() => {
          console.log('[BlocksBuild] letrero STARTUP asentado -> onComplete (BUILD_DONE)')
          onComplete()
        }}
      >
        <rect x="34.8" y={tope - 24} width="2.4" height="24" rx="1.2" fill="#e8ecff" />
        <rect
          x="-22"
          y={tope - 52}
          width="116"
          height="30"
          rx="8"
          fill="#0d1230"
          stroke={ROLE_HEX.tecnologia}
          strokeWidth="1.5"
        />
        <text className={styles.signText} x="36" y={tope - 31} textAnchor="middle">
          STARTUP
        </text>
      </motion.g>
    </svg>
  )
}

export default BlocksBuild
