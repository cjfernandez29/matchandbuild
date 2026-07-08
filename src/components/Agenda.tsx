import { EVENT } from '../config/event'
import SectionTitle from './SectionTitle'
import styles from './Agenda.module.css'

/** Timeline vertical de los 2 días, con hitos editables en config. */
function Agenda() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle titulo="Agenda" />
        <div className={styles.dias}>
          {EVENT.agenda.map((dia) => (
            <article key={dia.dia} className={styles.dia}>
              <header className={styles.diaHeader}>
                <h3 className={styles.diaTitulo}>{dia.dia}</h3>
                <p className={styles.diaHorario}>{dia.horario}</p>
              </header>
              <ol className={styles.timeline}>
                {dia.hitos.map((hito) => (
                  <li key={`${hito.hora}-${hito.titulo}`} className={styles.hito}>
                    <span className={styles.punto} aria-hidden="true" />
                    <div>
                      <p className={styles.hora}>{hito.hora}</p>
                      <h4 className={styles.hitoTitulo}>{hito.titulo}</h4>
                      {hito.descripcion && (
                        <p className={styles.hitoDescripcion}>{hito.descripcion}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Agenda
