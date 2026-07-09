import type { RoleColor } from '../config/event'

export type Role = RoleColor

export const ROLES: Role[] = ['tecnologia', 'marketing', 'operaciones', 'finanzas']

export const POSICIONES: Record<Role | 'ceo', { x: number; y: number }> = {
  ceo: { x: 50, y: 50 },
  tecnologia: { x: 15, y: 15 },
  marketing: { x: 85, y: 15 },
  operaciones: { x: 15, y: 85 },
  finanzas: { x: 85, y: 85 },
}

export const FORMACION: Record<Role, { x: number; y: number }> = {
  tecnologia: { x: 36, y: 36 },
  marketing: { x: 64, y: 36 },
  operaciones: { x: 36, y: 64 },
  finanzas: { x: 64, y: 64 },
}

export const FORMACION_FINAL: Record<Role | 'ceo', { x: number; y: number }> = {
  operaciones: { x: 35, y: 90 },
  tecnologia: { x: 56, y: 88 },
  ceo: { x: 76, y: 76 },
  finanzas: { x: 88, y: 56 },
  marketing: { x: 90, y: 35 },
}

export const ROLE_HEX: Record<Role | 'ceo', string> = {
  tecnologia: '#00c2ff',
  marketing: '#ff2e7e',
  operaciones: '#7b2ff7',
  finanzas: '#ff9f1c',
  ceo: '#2d6bff',
}
