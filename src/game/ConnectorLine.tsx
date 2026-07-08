import { motion } from 'framer-motion'
import { POSICIONES, type Role } from './constants'
import { TIMINGS } from './timings'

export type EstadoLinea = 'idle' | 'activa' | 'reclutada'

interface ConnectorLineProps {
  role: Role
  estado: EstadoLinea
  /** prefers-reduced-motion: la línea hace fade en vez de recorrido. */
  reducida: boolean
}

/**
 * Línea conectora esquina → centro en el plano del tablero.
 * Capa base tenue siempre visible + capa brillante que se "enciende"
 * recorriendo la línea con dash-offset (pathLength normalizado a 100).
 */
function ConnectorLine({ role, estado, reducida }: ConnectorLineProps) {
  const desde = POSICIONES[role]
  const hasta = POSICIONES.ceo
  const d = `M${desde.x} ${desde.y} L${hasta.x} ${hasta.y}`
  const color = `var(--color-${role})`

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.25}
      />
      <motion.path
        d={d}
        pathLength={100}
        strokeDasharray={100}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{
          strokeDashoffset: reducida || estado !== 'idle' ? 0 : 100,
          opacity: estado === 'activa' ? 1 : estado === 'reclutada' ? 0.55 : 0,
        }}
        transition={
          reducida
            ? { duration: 0.2 }
            : { duration: TIMINGS.lineDash, ease: 'easeIn' }
        }
      />
    </g>
  )
}

export default ConnectorLine
