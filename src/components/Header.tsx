import { EVENT } from '../config/event'
import { useCountdown } from '../hooks/useCountdown'
import { useScrollDirection } from '../hooks/useScrollDirection'
import EventLogo from './EventLogo'
import CountdownDisplay from './CountdownDisplay'
import styles from './Header.module.css'
import countdownStyles from './HeaderCountdown.module.css'

function Header() {
  const cuenta = useCountdown(EVENT.fechaInicio)
  const isScrollVisible = useScrollDirection()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <EventLogo />
        <div className={styles.right}>
          <div className={!isScrollVisible ? countdownStyles.hidden : ''}>
            {isScrollVisible && (
              <>
                {cuenta.comenzo ? (
                  <p className={styles.message}>¡El evento comenzó!</p>
                ) : (
                  <CountdownDisplay
                    dias={cuenta.dias}
                    horas={cuenta.horas}
                    minutos={cuenta.minutos}
                    segundos={cuenta.segundos}
                    size="sm"
                  />
                )}
              </>
            )}
          </div>
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
