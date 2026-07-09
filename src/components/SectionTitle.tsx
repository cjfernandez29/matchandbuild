import styles from './SectionTitle.module.css'

interface SectionTitleProps {
  kicker?: string
  titulo: string
  light?: boolean
}

function SectionTitle({ kicker, titulo, light = false }: SectionTitleProps) {
  return (
    <header className={`${styles.header} ${light ? styles.light : ''}`}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h2 className={styles.titulo}>{titulo}</h2>
    </header>
  )
}

export default SectionTitle
