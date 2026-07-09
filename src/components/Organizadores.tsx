import { EVENT } from '../config/event'
import SectionTitle from './SectionTitle'
import styles from './Organizadores.module.css'

function Organizadores() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle titulo="Organizan" />
        <ul className={styles.grid}>
          {EVENT.organizadores.map((org) => (
            <li key={org.nombre} className={styles.item}>
              <img
                className={styles.logo}
                src={org.logo}
                alt={org.nombre}
                width="160"
                height="80"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Organizadores
