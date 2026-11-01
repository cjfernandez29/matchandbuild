import { EVENT } from '../config/event'
import Accordion from './Accordion'
import SectionTitle from './SectionTitle'
import styles from './Retos.module.css'

function Retos() {
  const { retos } = EVENT

  return (
    <section className={styles.section} aria-labelledby="retos-titulo">
      <div className="container">
        <SectionTitle kicker={retos.kicker} titulo={retos.titulo} id="retos-titulo" />
        <p className={styles.subtitulo}>{retos.subtitulo}</p>

        <ul className={styles.retos}>
          {retos.lista.map((reto) => (
            <li
              key={reto.numero}
              className={styles.reto}
              style={{ '--reto-color': `var(--color-${reto.color})` } as React.CSSProperties}
            >
              <p className={styles.numero}>
                <span aria-hidden="true">{reto.emoji}</span> {reto.numero}
              </p>
              <h3 className={styles.retoTitulo}>{reto.titulo}</h3>
              <div className={styles.mision}>
                <p className={styles.misionLabel}>Tu misión</p>
                <p className={styles.misionTexto}>{reto.mision}</p>
              </div>
              <dl className={styles.detalles}>
                <div className={styles.detalle}>
                  <dt>
                    <span aria-hidden="true">😟</span> El problema
                  </dt>
                  <dd>{reto.problema}</dd>
                </div>
                <div className={styles.detalle}>
                  <dt>
                    <span aria-hidden="true">🛠️</span> Lo que vas a crear
                  </dt>
                  <dd>{reto.resultado}</dd>
                </div>
                <div className={styles.detalle}>
                  <dt>
                    <span aria-hidden="true">✅</span> Pruébalo con personas reales
                  </dt>
                  <dd>{reto.validacion}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className={styles.preguntas}>
          <Accordion
            idPrefix="retos"
            items={retos.preguntas.map((p) => ({
              pregunta: p.pregunta,
              contenido: (
                <>
                  <p className={styles.preguntaIntro}>{p.intro}</p>
                  <ul className={styles.respuestaLista}>
                    {p.items.map((item) => (
                      <li key={item.texto} className={styles.respuestaItem}>
                        <span className={styles.respuestaIcono} aria-hidden="true">
                          {item.emoji ?? '✔'}
                        </span>
                        <span>
                          {item.titulo && <strong>{item.titulo}:</strong>} {item.texto}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ),
            }))}
          />
        </div>

        <p className={styles.nota}>
          <span aria-hidden="true">💬</span> {retos.notaPrototipo}
        </p>
      </div>
    </section>
  )
}

export default Retos
