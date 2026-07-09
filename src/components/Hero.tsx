import { EVENT } from '../config/event'
import TeamBuilderGame from '../game/TeamBuilderGame'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>{EVENT.hero.kicker}</p>
        <h1 className={styles.titulo}>{EVENT.hero.titulo}</h1>
        <p className={styles.subtitulo}>{EVENT.hero.subtitulo}</p>
        <p className={styles.indicacion}>{EVENT.hero.indicacion}</p>
        <TeamBuilderGame />
      </div>
    </section>
  )
}

export default Hero
