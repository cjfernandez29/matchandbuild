import { EVENT } from '../config/event'
import { useCountdown } from '../hooks/useCountdown'
import SectionTitle from './SectionTitle'
import CountdownDisplay from './CountdownDisplay'
import styles from './CountdownSection.module.css'

function CountdownSection() {
  const cuenta = useCountdown(EVENT.fechaInicio)

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          kicker={EVENT.lema}
          titulo={cuenta.comenzo ? '¡El evento comenzó!' : 'Faltan'}
        />
        {!cuenta.comenzo && (
          <div
            role="timer"
            aria-label={`Cuenta regresiva para ${EVENT.nombre}`}
          >
            <CountdownDisplay
              dias={cuenta.dias}
              horas={cuenta.horas}
              minutos={cuenta.minutos}
              segundos={cuenta.segundos}
              size="lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default CountdownSection
