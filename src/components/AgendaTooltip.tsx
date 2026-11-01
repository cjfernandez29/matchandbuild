import { useEffect, useId, useRef } from 'react'
import styles from './AgendaTooltip.module.css'

interface AgendaTooltipProps {
  titulo: string
  descripcion: string
  abierto: boolean
  onToggle: () => void
  onClose: () => void
}

function AgendaTooltip({ titulo, descripcion, abierto, onToggle, onClose }: AgendaTooltipProps) {
  const id = useId()
  const ref = useRef<HTMLSpanElement>(null)

  // Mientras está fijado (click / toque), se cierra al tocar fuera o con Esc
  useEffect(() => {
    if (!abierto) return
    const alTocarFuera = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    const alPresionarTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', alTocarFuera)
    document.addEventListener('keydown', alPresionarTecla)
    return () => {
      document.removeEventListener('pointerdown', alTocarFuera)
      document.removeEventListener('keydown', alPresionarTecla)
    }
  }, [abierto, onClose])

  return (
    <span ref={ref} className={`${styles.wrapper} ${abierto ? styles.abierto : ''}`}>
      <button
        type="button"
        className={styles.boton}
        aria-describedby={id}
        aria-expanded={abierto}
        onClick={onToggle}
      >
        {titulo}
        <span className={styles.icono} aria-hidden="true">
          i
        </span>
      </button>
      <span id={id} role="tooltip" className={styles.burbuja}>
        {descripcion}
      </span>
    </span>
  )
}

export default AgendaTooltip
