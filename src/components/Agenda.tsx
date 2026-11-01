import { useCallback, useState } from 'react'
import { EVENT } from '../config/event'
import AgendaTooltip from './AgendaTooltip'
import SectionTitle from './SectionTitle'
import styles from './Agenda.module.css'

function Agenda() {
  // Solo un tooltip fijado a la vez
  const [abierto, setAbierto] = useState<string | null>(null)
  const cerrar = useCallback(() => setAbierto(null), [])

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle titulo="Agenda" />
        <div className={styles.dias}>
          {EVENT.agenda.map((dia, d) => (
            <article key={dia.dia} className={styles.dia}>
              <header className={styles.diaHeader}>
                <h3 className={styles.diaTitulo}>{dia.dia}</h3>
                <p className={styles.diaHorario}>{dia.horario}</p>
              </header>
              <ol className={styles.timeline}>
                {dia.hitos.map((hito, h) => {
                  const clave = `${d}-${h}`
                  return (
                    <li
                      key={`${hito.hora}-${hito.titulo}`}
                      className={`${styles.hito} ${hito.tipo ? styles[hito.tipo] : ''}`}
                    >
                      <span className={styles.punto} aria-hidden="true" />
                      <div>
                        <p className={styles.hora}>
                          {hito.hora}
                          {hito.tipo === 'reto' && <span className={styles.etiqueta}>🎯 Reto</span>}
                          {hito.tipo === 'pausa' && <span className={styles.etiqueta}>☕ Pausa</span>}
                        </p>
                        <h4 className={styles.hitoTitulo}>
                          {hito.descripcion ? (
                            <AgendaTooltip
                              titulo={hito.titulo}
                              descripcion={hito.descripcion}
                              abierto={abierto === clave}
                              onToggle={() => setAbierto((actual) => (actual === clave ? null : clave))}
                              onClose={cerrar}
                            />
                          ) : (
                            hito.titulo
                          )}
                        </h4>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Agenda
