import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ROLE_HEX } from './constants'
import { TIMINGS } from './timings'
import styles from './BlocksBuild.module.css'

/** Orden de los niveles de la torre, de la base a la cima. */
const NIVELES = ['ceo', 'tecnologia', 'marketing', 'operaciones', 'finanzas'] as const

const LADO_H = 30 // alto de las caras laterales del cubo = paso de apilado

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

interface BlocksBuildProps {
  reducida: boolean
  /** Se dispara al asentarse el banderín → BUILD_DONE. */
  onComplete: () => void
}

/**
 * Torre final: 5 cubos isométricos (uno por color de rol + CEO) que
 * caen y se apilan con stagger y rebote, coronados por un letrero
 * luminoso "STARTUP". Con prefers-reduced-motion aparecen con fades.
 */
function BlocksBuild({ reducida, onComplete }: BlocksBuildProps) {
  const contenedor: Variants = {
    hidden: {},
    visible: {
      transition: {
        // Espera a que el equipo se reagrupe al borde antes de construir
        delayChildren: reducida ? 0.3 : TIMINGS.regroupDelay + TIMINGS.regroup + 0.3,
        staggerChildren: reducida ? 0.12 : TIMINGS.blockStagger,
      },
    },
  }

  const bloque: Variants = {
    hidden: reducida ? { opacity: 0 } : { opacity: 0, y: -110 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducida
        ? { duration: 0.25 }
        : { duration: TIMINGS.blockDrop, ease: 'backOut' },
    },
  }

  return (
    <motion.svg
      className={styles.svg}
      viewBox="-26 0 124 244"
      initial="hidden"
      animate="visible"
      variants={contenedor}
      aria-hidden="true"
    >
      {NIVELES.map((nivel, i) => (
        <g key={nivel} transform={`translate(0 ${178 - i * LADO_H})`}>
          <motion.g variants={bloque}>
            <Cubo color={ROLE_HEX[nivel]} />
          </motion.g>
        </g>
      ))}

      {/* Letrero "STARTUP" en la cima (último hijo: cierra la secuencia) */}
      <motion.g
        className={styles.sign}
        variants={bloque}
        onAnimationComplete={onComplete}
      >
        <rect x="34.8" y="34" width="2.4" height="26" rx="1.2" fill="#e8ecff" />
        <rect
          x="-22"
          y="6"
          width="116"
          height="30"
          rx="8"
          fill="#0d1230"
          stroke={ROLE_HEX.tecnologia}
          strokeWidth="1.5"
        />
        <text className={styles.signText} x="36" y="27" textAnchor="middle">
          STARTUP
        </text>
      </motion.g>
    </motion.svg>
  )
}

export default BlocksBuild
