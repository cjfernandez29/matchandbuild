import type { RoleColor } from '../config/event'

/** Rol de candidato (coincide con los colores de rol de los tokens). */
export type Role = RoleColor

export const ROLES: Role[] = ['tecnologia', 'marketing', 'operaciones', 'finanzas']

/**
 * Posiciones de las plataformas en el plano del tablero (porcentaje).
 * Se usan tanto para colocar personajes/plataformas como para las
 * líneas conectoras SVG; en el paso de interacción, los viajes se
 * animan entre estas mismas coordenadas locales (pre-transform 3D).
 */
export const POSICIONES: Record<Role | 'ceo', { x: number; y: number }> = {
  ceo: { x: 50, y: 50 },
  tecnologia: { x: 15, y: 15 },
  marketing: { x: 85, y: 15 },
  operaciones: { x: 15, y: 85 },
  finanzas: { x: 85, y: 85 },
}

/**
 * Posición fija de cada reclutado alrededor del CEO (formación en
 * pentágono: 4 puestos + CEO al centro), en el plano del tablero.
 */
export const FORMACION: Record<Role, { x: number; y: number }> = {
  tecnologia: { x: 36, y: 36 },
  marketing: { x: 64, y: 36 },
  operaciones: { x: 36, y: 64 },
  finanzas: { x: 64, y: 64 },
}

/**
 * Posiciones del final: los 5 se reagrupan al borde inferior del
 * tablero mirando al centro mientras la torre se construye.
 */
export const FORMACION_FINAL: Record<Role | 'ceo', { x: number; y: number }> = {
  ceo: { x: 50, y: 86 },
  tecnologia: { x: 18, y: 62 },
  marketing: { x: 82, y: 62 },
  operaciones: { x: 32, y: 82 },
  finanzas: { x: 68, y: 82 },
}

/** Hex reales de los tokens, para dibujar partículas en canvas. */
export const ROLE_HEX: Record<Role | 'ceo', string> = {
  tecnologia: '#00c2ff',
  marketing: '#ff2e7e',
  operaciones: '#7b2ff7',
  finanzas: '#ff9f1c',
  ceo: '#2d6bff',
}
