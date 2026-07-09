import { useState } from 'react'
import { EVENT } from '../config/event'
import SectionTitle from './SectionTitle'
import styles from './Faq.module.css'

function Faq() {
  const [abierta, setAbierta] = useState<number | null>(null)

  const toggle = (i: number) => {
    setAbierta((actual) => (actual === i ? null : i))
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle titulo="Preguntas frecuentes" />
        <ul className={styles.lista}>
          {EVENT.faqs.map((faq, i) => {
            const estaAbierta = abierta === i
            return (
              <li key={faq.pregunta} className={styles.item}>
                <h3 className={styles.pregunta}>
                  <button
                    type="button"
                    id={`faq-boton-${i}`}
                    className={styles.boton}
                    aria-expanded={estaAbierta}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span>{faq.pregunta}</span>
                    <svg
                      className={`${styles.chevron} ${estaAbierta ? styles.chevronAbierto : ''}`}
                      viewBox="0 0 16 16"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 6l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-boton-${i}`}
                  className={`${styles.panel} ${estaAbierta ? styles.panelAbierto : ''}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.respuesta}>{faq.respuesta}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Faq
