import type { Role } from './constants'
import type { Gender } from './genders'
import styles from './Character.module.css'

const SKIN = '#f6c9a3'
const DARK = '#141a3d'
const HAIR_F = '#5b3a1e'
const HAIR_M = '#2f2015'

interface CharacterProps {
  role: Role | 'ceo'
  gender: Gender
  /** Versión C-level tras el reclutamiento: gana una corona. */
  cLevel?: boolean
}

/** Accesorio identificador de cada rol, dibujado frente al torso. */
function Accesorio({ role }: { role: Role | 'ceo' }) {
  switch (role) {
    case 'tecnologia':
      // Laptop abierta
      return (
        <g>
          <rect x="21" y="48" width="22" height="13" rx="2" fill={DARK} stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
          <rect x="19" y="61" width="26" height="3.5" rx="1.5" fill="rgba(255,255,255,0.85)" />
          <path d="M25 52h8M25 55h12" stroke="#00c2ff" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      )
    case 'marketing':
      // Megáfono
      return (
        <g>
          <path d="M22 55l15-7v18l-15-7z" fill="rgba(255,255,255,0.92)" />
          <rect x="36" y="53" width="5" height="8" rx="2" fill={DARK} />
          <path d="M42 53c2 1.5 2 6.5 0 8" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )
    case 'operaciones':
      // Engranaje
      return (
        <g>
          <circle cx="32" cy="57" r="7.5" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="4.5" strokeDasharray="3.4 2.6" />
          <circle cx="32" cy="57" r="2.6" fill="rgba(255,255,255,0.92)" />
        </g>
      )
    case 'finanzas':
      // Calculadora
      return (
        <g>
          <rect x="24" y="48" width="16" height="20" rx="2.5" fill="rgba(255,255,255,0.94)" />
          <rect x="26.5" y="50.5" width="11" height="4.5" rx="1" fill={DARK} />
          {[0, 1, 2].map((fila) =>
            [0, 1, 2].map((col) => (
              <circle key={`${fila}-${col}`} cx={28 + col * 4} cy={59 + fila * 3.5} r="1.2" fill={DARK} />
            )),
          )}
        </g>
      )
    case 'ceo':
      // Camisa + corbata
      return (
        <g>
          <path d="M26 42h12v10a6 6 0 0 1-12 0z" fill="rgba(255,255,255,0.94)" />
          <path d="M32 44l3.4 4-3.4 13-3.4-13z" fill={DARK} />
        </g>
      )
  }
}

/**
 * Avatar flat en SVG, parametrizado por rol (color + accesorio)
 * y género (peinado, silueta). Sin imágenes externas.
 */
function Character({ role, gender, cLevel = false }: CharacterProps) {
  const color = `var(--color-${role})`

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 64 92"
      role="presentation"
      aria-hidden="true"
    >
      {/* Sombra en el piso */}
      <ellipse cx="32" cy="88" rx="16" ry="3.5" fill="rgba(0,0,0,0.35)" />

      {/* Piernas */}
      <rect x="24" y="70" width="6.5" height="16" rx="3" fill={DARK} />
      <rect x="33.5" y="70" width="6.5" height="16" rx="3" fill={DARK} />

      {/* Torso (con falda en la variante femenina) */}
      {gender === 'f' ? (
        <path d="M22 46a10 10 0 0 1 10-8 10 10 0 0 1 10 8l4 26H18z" fill={color} />
      ) : (
        <rect x="18" y="40" width="28" height="32" rx="10" fill={color} />
      )}

      {/* Brazos */}
      <rect x="13" y="44" width="7" height="20" rx="3.5" fill={color} />
      <rect x="44" y="44" width="7" height="20" rx="3.5" fill={color} />

      {/* Cabeza */}
      <circle cx="32" cy="24" r="13.5" fill={SKIN} />

      {/* Peinado por género */}
      {gender === 'f' ? (
        <g fill={HAIR_F}>
          <path d="M17.5 24a14.5 14.5 0 0 1 29 0l-3 .5a11.5 11.5 0 0 0-23 0z" />
          <rect x="15" y="21" width="7" height="24" rx="3.5" />
          <rect x="42" y="21" width="7" height="24" rx="3.5" />
        </g>
      ) : (
        <path
          d="M18 23a14 14 0 0 1 28 0l-4 .5a10.5 10.5 0 0 0-20 0z"
          fill={HAIR_M}
        />
      )}

      {/* Cara */}
      <circle cx="26.5" cy="26" r="1.9" fill={DARK} />
      <circle cx="37.5" cy="26" r="1.9" fill={DARK} />
      <path d="M27 31.5q5 4 10 0" fill="none" stroke={DARK} strokeWidth="1.8" strokeLinecap="round" />

      <Accesorio role={role} />

      {/* Corona C-level */}
      {cLevel && (
        <path
          d="M22 13.5l3.2-8 6.8 5.4L38.8 5.5l3.2 8z"
          fill="#ffd34d"
          stroke="#c9971c"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export default Character
