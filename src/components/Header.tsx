import { EVENT } from '../config/event'
import { useCountdown } from '../hooks/useCountdown'
import EventLogo from './EventLogo'
import styles from './Header.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

/** Header fijo claro: logo SVG, countdown compacto y botón "Regístrate". */
function Header() {
  const cuenta = useCountdown(EVENT.fechaInicio)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <EventLogo />
        <div className={styles.right}>
          <p className={styles.countdown}>
            {cuenta.comenzo ? (
              '¡El evento comenzó!'
            ) : (
              <>
                <span className={styles.dias}>{cuenta.dias}d</span>{' '}
                {pad(cuenta.horas)}:{pad(cuenta.minutos)}:{pad(cuenta.segundos)}
              </>
            )}
          </p>
          <a
            className={styles.cta}
            href={EVENT.urlRegistro}
            target="_blank"
            rel="noopener noreferrer"
          >
            Regístrate
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
