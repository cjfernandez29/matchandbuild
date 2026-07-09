import { useState } from 'react'
import { EVENT } from '../config/event'
import SectionTitle from './SectionTitle'
import styles from './Ubicacion.module.css'

function Ubicacion() {
  const [mapaCargado, setMapaCargado] = useState(false)

  return (
    <section className={styles.section}>
      <img
        className={styles.fondo}
        src="/fondo/fondo_chiclayo.jpg"
        alt=""
        loading="lazy"
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <SectionTitle titulo="Ubicación" light />
        <div className={styles.card}>
          <p className={styles.nombre}>{EVENT.lugar.nombre}</p>
          <p className={styles.direccion}>{EVENT.lugar.direccion}</p>

          <div className={styles.mapaWrap}>
            {!mapaCargado && <div className={styles.skeleton} aria-hidden="true" />}
            <iframe
              className={`${styles.mapa} ${mapaCargado ? styles.mapaVisible : ''}`}
              src={EVENT.lugar.mapsEmbedUrl}
              title={`Mapa: ${EVENT.lugar.nombre}, ${EVENT.lugar.direccion}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapaCargado(true)}
            />
          </div>

          <a
            className={styles.boton}
            href={EVENT.lugar.comoLlegarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  )
}

export default Ubicacion
