import { EVENT } from '../config/event'
import styles from './CtaFinal.module.css'

/** Banda final con gradiente fucsia→naranja (como el afiche) + CTA. */
function CtaFinal() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.texto}>{EVENT.ctaFinal.texto}</p>
        <a
          className={styles.boton}
          href={EVENT.urlRegistro}
          target="_blank"
          rel="noopener noreferrer"
        >
          {EVENT.ctaFinal.boton}
        </a>
      </div>
    </section>
  )
}

export default CtaFinal
