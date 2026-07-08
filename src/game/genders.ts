import { ROLES, type Role } from './constants'

export type Gender = 'f' | 'm'

const PERSONAJES: (Role | 'ceo')[] = [...ROLES, 'ceo']

/**
 * Sortea el género de los 5 personajes en cada carga (y en cada
 * "Jugar de nuevo"), garantizando al menos 2 femeninos y 2
 * masculinos: se barajan los personajes, los 2 primeros son 'f',
 * los 2 siguientes 'm' y el quinto sale al azar.
 */
export function sortearGeneros(): Record<Role | 'ceo', Gender> {
  const orden = [...PERSONAJES]
  for (let i = orden.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[orden[i], orden[j]] = [orden[j], orden[i]]
  }

  const generos = {} as Record<Role | 'ceo', Gender>
  orden.forEach((personaje, i) => {
    generos[personaje] = i < 2 ? 'f' : i < 4 ? 'm' : Math.random() < 0.5 ? 'f' : 'm'
  })
  return generos
}
