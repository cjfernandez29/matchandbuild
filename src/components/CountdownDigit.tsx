import { useEffect, useRef } from 'react'
import styles from './CountdownDigit.module.css'

interface CountdownDigitProps {
  value: string
  size: 'sm' | 'lg'
  animate?: boolean
}

function CountdownDigit({ value, size, animate = true }: CountdownDigitProps) {
  const prevValueRef = useRef(value)
  const digitRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (animate && prevValueRef.current !== value && digitRef.current) {
      digitRef.current.classList.remove(styles.flip)
      void digitRef.current.offsetWidth
      digitRef.current.classList.add(styles.flip)
      prevValueRef.current = value
    }
  }, [value, animate])

  return (
    <span ref={digitRef} className={`${styles.digit} ${styles[size]}`}>
      {value}
    </span>
  )
}

export default CountdownDigit
