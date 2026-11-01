import { useState } from 'react'
import type { ReactNode } from 'react'
import styles from './Accordion.module.css'

interface AccordionProps {
  idPrefix: string
  items: { pregunta: string; contenido: ReactNode }[]
}

function Accordion({ idPrefix, items }: AccordionProps) {
  const [abierta, setAbierta] = useState<number | null>(null)

  const toggle = (i: number) => {
    setAbierta((actual) => (actual === i ? null : i))
  }

  return (
    <ul className={styles.lista}>
      {items.map((item, i) => {
        const estaAbierta = abierta === i
        const botonId = `${idPrefix}-boton-${i}`
        const panelId = `${idPrefix}-panel-${i}`
        return (
          <li key={item.pregunta} className={styles.item}>
            <h3 className={styles.pregunta}>
              <button
                type="button"
                id={botonId}
                className={styles.boton}
                aria-expanded={estaAbierta}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.pregunta}</span>
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
              id={panelId}
              role="region"
              aria-labelledby={botonId}
              className={`${styles.panel} ${estaAbierta ? styles.panelAbierto : ''}`}
            >
              <div className={styles.panelInner}>
                <div className={styles.contenido}>{item.contenido}</div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Accordion
