import { ROLES } from './constants'
import { sortearGeneros } from './genders'
import type { Role } from './constants'
import type { Gender } from './genders'

export type { Role, Gender }

export type GamePhase =
  | { name: 'idle' }
  | { name: 'recruiting'; role: Role }
  | { name: 'building' }
  | { name: 'win' }

export interface GameState {
  phase: GamePhase
  recruited: Role[]
  queue: Role[]
  genders: Record<Role | 'ceo', Gender>
}

export type GameAction =
  | { type: 'CLICK_CANDIDATE'; role: Role }
  | { type: 'TRAVEL_DONE'; role: Role }
  | { type: 'BUILD_DONE' }
  | { type: 'RESET' }

export function initGameState(): GameState {
  return {
    phase: { name: 'idle' },
    recruited: [],
    queue: [],
    genders: sortearGeneros(),
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CLICK_CANDIDATE': {
      const { role } = action
      if (state.recruited.includes(role) || state.queue.includes(role)) return state

      if (state.phase.name === 'idle') {
        return { ...state, phase: { name: 'recruiting', role } }
      }
      if (state.phase.name === 'recruiting') {
        if (state.phase.role === role) return state
        return { ...state, queue: [...state.queue, role] }
      }
      return state
    }

    case 'TRAVEL_DONE': {
      if (state.phase.name !== 'recruiting' || state.phase.role !== action.role) {
        return state
      }
      const recruited = [...state.recruited, action.role]
      const [siguiente, ...resto] = state.queue

      if (siguiente) {
        return { ...state, recruited, queue: resto, phase: { name: 'recruiting', role: siguiente } }
      }
      if (recruited.length === ROLES.length) {
        return { ...state, recruited, queue: [], phase: { name: 'building' } }
      }
      return { ...state, recruited, queue: [], phase: { name: 'idle' } }
    }

    case 'BUILD_DONE':
      return state.phase.name === 'building' ? { ...state, phase: { name: 'win' } } : state

    case 'RESET':
      return initGameState()
  }
}
