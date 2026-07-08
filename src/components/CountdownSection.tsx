import { EVENT } from '../config/event'
import { useCountdown } from '../hooks/useCountdown'
import SectionTitle from './SectionTitle'
import styles from './CountdownSection.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

/** Countdown grande días/horas/min/seg hacia fechaInicio, sin drift. */
function CountdownSection() {
  const cuenta = useCountdown(EVENT.fechaInicio)

  const unidades = [
    { etiqueta: 'Días', valor: String(cuenta.dias) },
    { etiqueta: 'Horas', valor: pad(cuenta.horas) },
    { etiqueta: 'Min', valor: pad(cuenta.minutos) },
    { etiqueta: 'Seg', valor: pad(cuenta.segundos) },
  ]

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          kicker={EVENT.lema}
          titulo={cuenta.comenzo ? '¡El evento comenzó!' : 'Faltan'}
        />
        {!cuenta.comenzo && (
          <div
            className={styles.grid}
            role="timer"
            aria-label={`Cuenta regresiva para ${EVENT.nombre}`}
          >
            {unidades.map((unidad) => (
              <div key={unidad.etiqueta} className={styles.unidad}>
                <span className={styles.valor}>{unidad.valor}</span>
                <span className={styles.etiqueta}>{unidad.etiqueta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CountdownSection
