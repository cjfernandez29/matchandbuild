import { EVENT } from '../config/event'
import SectionTitle from './SectionTitle'
import styles from './Premios.module.css'

function Premios() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle kicker="CONSTRUYE ALGO INCREÍBLE" titulo="Premios" />
        <ol className={styles.podio}>
          {EVENT.premios.map((premio, i) => (
            <li key={premio.puesto} className={`${styles.card} ${styles[`puesto${i + 1}`]}`}>
              <span className={styles.puesto}>{premio.puesto}</span>
              <h3 className={styles.titulo}>{premio.titulo}</h3>
              <p className={styles.descripcion}>{premio.descripcion}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Premios
