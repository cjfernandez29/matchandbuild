import { EVENT } from '../config/event'
import SectionTitle from './SectionTitle'
import styles from './QueViviras.module.css'

/** 4 cards con hover lift y borde superior del color de su rol. */
function QueViviras() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle titulo="Qué vivirás" />
        <ul className={styles.grid}>
          {EVENT.queViviras.map((item) => (
            <li
              key={item.titulo}
              className={styles.card}
              style={{ '--card-color': `var(--color-${item.color})` } as React.CSSProperties}
            >
              <h3 className={styles.titulo}>{item.titulo}</h3>
              <p className={styles.descripcion}>{item.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default QueViviras
