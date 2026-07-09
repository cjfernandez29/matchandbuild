import { TIMINGS } from './timings'
import type { Role } from './constants'

export interface NivelEdificio {
  key: string
  role?: Role
}

export const NIVELES_EDIFICIO: NivelEdificio[] = [
  { key: 'cimiento' },
  { key: 'tecnologia', role: 'tecnologia' },
  { key: 'marketing', role: 'marketing' },
  { key: 'operaciones', role: 'operaciones' },
  { key: 'finanzas', role: 'finanzas' },
  { key: 'techo' },
]

function esperaInicial(reducida: boolean): number {
  return reducida ? 0.3 : TIMINGS.regroupDelay + TIMINGS.regroup + 0.3
}

export function delayNivel(indice: number, reducida: boolean): number {
  const paso = reducida ? 0.12 : TIMINGS.blockStagger
  return esperaInicial(reducida) + indice * paso
}
