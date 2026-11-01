import { EVENT } from '../config/event'
import Accordion from './Accordion'
import SectionTitle from './SectionTitle'
import styles from './Faq.module.css'

function Faq() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle titulo="Preguntas frecuentes" />
        <Accordion
          idPrefix="faq"
          items={EVENT.faqs.map((faq) => ({
            pregunta: faq.pregunta,
            contenido: Array.isArray(faq.respuesta) ? (
              <ul className={styles.respuestaLista}>
                {faq.respuesta.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{faq.respuesta}</p>
            ),
          }))}
        />
      </div>
    </section>
  )
}

export default Faq
