import styles from './SectionTitle.module.css'

interface SectionTitleProps {
  kicker?: string
  titulo: string
  light?: boolean
  id?: string
}

function SectionTitle({ kicker, titulo, light = false, id }: SectionTitleProps) {
  return (
    <header className={`${styles.header} ${light ? styles.light : ''}`}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h2 id={id} className={styles.titulo}>{titulo}</h2>
    </header>
  )
}

export default SectionTitle
