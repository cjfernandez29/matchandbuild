import styles from './CountdownDisplay.module.css'

interface CountdownDisplayProps {
  dias: number
  horas: number
  minutos: number
  segundos: number
  size: 'sm' | 'lg'
}

const pad = (n: number) => String(n).padStart(2, '0')

function CountdownDisplay({
  dias,
  horas,
  minutos,
  segundos,
  size,
}: CountdownDisplayProps) {
  const diasStr = pad(dias)
  const horasStr = pad(horas)
  const minutosStr = pad(minutos)
  const segundosStr = pad(segundos)

  if (size === 'sm') {
    return (
      <div className={styles.containerSm}>
        <div className={styles.pairSm}>
          <div className={styles.boxSm}>
            <span className={styles.numbersSm}>{diasStr}</span>
          </div>
          <span className={styles.labelSm}>D</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.pairSm}>
          <div className={styles.boxSm}>
            <span className={styles.numbersSm}>{horasStr}</span>
          </div>
          <span className={styles.labelSm}>H</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.pairSm}>
          <div className={styles.boxSm}>
            <span className={styles.numbersSm}>{minutosStr}</span>
          </div>
          <span className={styles.labelSm}>M</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.pairSm}>
          <div className={styles.boxSm}>
            <span className={styles.numbersSm}>{segundosStr}</span>
          </div>
          <span className={styles.labelSm}>S</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.containerLg}>
      <div className={styles.unitLg}>
        <div className={styles.boxLg}>
          <span className={styles.numbersLg}>{diasStr}</span>
        </div>
        <span className={styles.labelLg}>Días</span>
      </div>
      <div className={styles.unitLg}>
        <div className={styles.boxLg}>
          <span className={styles.numbersLg}>{horasStr}</span>
        </div>
        <span className={styles.labelLg}>Horas</span>
      </div>
      <div className={styles.unitLg}>
        <div className={styles.boxLg}>
          <span className={styles.numbersLg}>{minutosStr}</span>
        </div>
        <span className={styles.labelLg}>Min</span>
      </div>
      <div className={styles.unitLg}>
        <div className={styles.boxLg}>
          <span className={styles.numbersLg}>{segundosStr}</span>
        </div>
        <span className={styles.labelLg}>Seg</span>
      </div>
    </div>
  )
}

export default CountdownDisplay
