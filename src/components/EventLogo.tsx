import styles from './EventLogo.module.css'

interface EventLogoProps {
  /** Variante clara para fondos oscuros (footer). */
  light?: boolean
}

/**
 * Logo del evento recreado en SVG: dos piezas de rompecabezas
 * interlocadas (fucsia + cian, como el afiche) + wordmark.
 */
function EventLogo({ light = false }: EventLogoProps) {
  return (
    <span className={`${styles.logo} ${light ? styles.light : ''}`}>
      <svg
        className={styles.icon}
        viewBox="0 0 44 38"
        role="presentation"
        aria-hidden="true"
      >
        <path
          fill="var(--color-marketing)"
          d="M4 10 H22 V15 A4 4 0 1 1 22 23 V28 H4 Z"
        />
        <path
          fill="var(--color-tecnologia)"
          d="M22 10 H40 V28 H22 V23 A4 4 0 1 0 22 15 Z"
        />
      </svg>
      <span className={styles.wordmark}>
        MATCH <span className={styles.amp}>&amp;</span> BUILD
      </span>
    </span>
  )
}

export default EventLogo
