import { EVENT } from '../config/event'
import EventLogo from './EventLogo'
import styles from './Footer.module.css'

const ICONOS: Record<'instagram' | 'facebook' | 'tiktok', React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.4" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.2 0-1-.1-1.9-.1-1.9 0-3.3 1.2-3.3 3.4V11H8.5v3h2.7v7h2.3Z"
      />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.6 3c.3 1.8 1.5 3.2 3.4 3.4v2.9c-1.3 0-2.5-.4-3.4-1.1v5.7a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v3a2.4 2.4 0 1 0 1.5 2.2V3h2.9Z"
      />
    </svg>
  ),
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <EventLogo light />
        <p className={styles.lema}>{EVENT.lema}</p>

        <ul className={styles.redes}>
          {EVENT.redes.map((red) =>
            red.habilitado && red.url ? (
              <li key={red.nombre}>
                <a
                  className={styles.red}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={red.nombre}
                >
                  {ICONOS[red.nombre]}
                </a>
              </li>
            ) : (
              <li key={red.nombre}>
                <span
                  className={`${styles.red} ${styles.redDeshabilitada}`}
                  title={`${red.nombre} (próximamente)`}
                  aria-label={`${red.nombre} (próximamente)`}
                  aria-disabled="true"
                >
                  {ICONOS[red.nombre]}
                </span>
              </li>
            ),
          )}
        </ul>

        <p className={styles.organizadores}>
          Organizan: {EVENT.organizadores.map((o) => o.nombre).join(' · ')}
        </p>

        <p className={styles.hashtags}>{EVENT.hashtags.join(' ')}</p>
      </div>
    </footer>
  )
}

export default Footer
