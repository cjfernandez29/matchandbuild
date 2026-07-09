import styles from './EventLogo.module.css'

interface EventLogoProps {
  light?: boolean
}

function EventLogo({ light = false }: EventLogoProps) {
  return (
    <a href="/" className={`${styles.logo} ${light ? styles.light : ''}`}>
      <img
        src="/logos/logo_evento.png"
        alt="Match & Build Challenge"
        className={styles.logoImage}
      />
      <span className={styles.wordmark}>
        MATCH <span className={styles.amp}>&amp;</span> BUILD
      </span>
    </a>
  )
}

export default EventLogo
