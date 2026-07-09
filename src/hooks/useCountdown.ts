import { useEffect, useMemo, useState } from 'react'

export interface CountdownState {
  dias: number
  horas: number
  minutos: number
  segundos: number
  comenzo: boolean
}

function calcular(target: number): CountdownState {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, comenzo: true }
  }
  const totalSegundos = Math.floor(diff / 1000)
  return {
    dias: Math.floor(totalSegundos / 86400),
    horas: Math.floor((totalSegundos % 86400) / 3600),
    minutos: Math.floor((totalSegundos % 3600) / 60),
    segundos: totalSegundos % 60,
    comenzo: false,
  }
}

export function useCountdown(fechaIso: string): CountdownState {
  const target = useMemo(() => new Date(fechaIso).getTime(), [fechaIso])
  const [state, setState] = useState<CountdownState>(() => calcular(target))

  useEffect(() => {
    setState(calcular(target))
    let id: number

    const tick = () => {
      const siguiente = calcular(target)
      setState(siguiente)
      if (!siguiente.comenzo) {
        id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
      }
    }

    id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    return () => window.clearTimeout(id)
  }, [target])

  return state
}
