import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EVENT } from '../config/event'
import { ROLE_HEX } from './constants'
import { TIMINGS } from './timings'
import styles from './WinBurst.module.css'

const COLORES = Object.values(ROLE_HEX)

interface Pieza {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vrot: number
  w: number
  h: number
  color: string
}

function WinBurst({ reducida }: { reducida: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reducida) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    const W = canvas.width
    const H = canvas.height

    let piezas: Pieza[] = []
    for (let i = 0; i < 90; i++) {
      const ang = Math.random() * Math.PI * 2
      const vel = (Math.random() * 7 + 3) * dpr
      piezas.push({
        x: W / 2,
        y: H * 0.45,
        vx: Math.cos(ang) * vel,
        vy: Math.sin(ang) * vel - 2 * dpr,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        w: (Math.random() * 6 + 4) * dpr,
        h: (Math.random() * 10 + 6) * dpr,
        color: COLORES[i % COLORES.length],
      })
    }

    const inicio = performance.now()
    let raf = 0

    const paso = (t: number) => {
      const lloviendo = t - inicio < TIMINGS.confettiDuration * 1000
      if (lloviendo) {
        for (let i = 0; i < 3; i++) {
          piezas.push({
            x: Math.random() * W,
            y: -14 * dpr,
            vx: (Math.random() - 0.5) * 1.6 * dpr,
            vy: (Math.random() * 2 + 2) * dpr,
            rot: Math.random() * Math.PI,
            vrot: (Math.random() - 0.5) * 0.25,
            w: (Math.random() * 6 + 4) * dpr,
            h: (Math.random() * 10 + 6) * dpr,
            color: COLORES[Math.floor(Math.random() * COLORES.length)],
          })
        }
      }

      ctx.clearRect(0, 0, W, H)
      piezas = piezas.filter((p) => p.y < H + 24 * dpr)
      for (const p of piezas) {
        p.vy += 0.12 * dpr
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vrot
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (lloviendo || piezas.length > 0) {
        raf = requestAnimationFrame(paso)
      } else {
        ctx.clearRect(0, 0, W, H)
      }
    }

    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [reducida])

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.stampWrap}>
        <motion.p
          className={styles.stamp}
          initial={reducida ? { opacity: 0 } : { scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: TIMINGS.winStamp, ease: 'backOut' }}
        >
          {EVENT.juego.win}
        </motion.p>
      </div>
    </>
  )
}

export default WinBurst
