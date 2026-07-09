import { TIMINGS } from './timings'
import type { Role } from './constants'

export interface NivelEdificio {
  key: string
  /** Rol dueño del piso (cimiento y techo no tienen rol). */
  role?: Role
}

/**
 * Niveles del edificio que se arma en "building", de la base a la
 * cima: cimiento (con puerta), un piso por rol reclutado (con
 * ventanas) y el techo. El letrero STARTUP se trata como un nivel
 * más, en el índice NIVELES_EDIFICIO.length, para reusar la misma
 * fórmula de delay.
 */
export const NIVELES_EDIFICIO: NivelEdificio[] = [
  { key: 'cimiento' },
  { key: 'tecnologia', role: 'tecnologia' },
  { key: 'marketing', role: 'marketing' },
  { key: 'operaciones', role: 'operaciones' },
  { key: 'finanzas', role: 'finanzas' },
  { key: 'techo' },
]

/** Pausa antes del primer bloque: espera a que el equipo se reagrupe al borde. */
function esperaInicial(reducida: boolean): number {
  return reducida ? 0.3 : TIMINGS.regroupDelay + TIMINGS.regroup + 0.3
}

/**
 * Delay (s) desde que arranca la fase "building" al que cae el
 * bloque del nivel `indice`. La usan tanto BlocksBuild (para animar
 * los bloques) como TeamBuilderGame (para disparar el pulso de
 * partículas del personaje correspondiente en el mismo instante).
 */
export function delayNivel(indice: number, reducida: boolean): number {
  const paso = reducida ? 0.12 : TIMINGS.blockStagger
  return esperaInicial(reducida) + indice * paso
}
