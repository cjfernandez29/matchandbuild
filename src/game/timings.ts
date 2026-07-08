/** Ritmo del juego: todas las duraciones de animación en un lugar. */
export const TIMINGS = {
  idleBreath: 2.4, // respiración del CEO (s)
  idleBounce: 1.8, // rebote de candidatos (s)
  lineDash: 0.35, // encendido de línea conectora (s)
  travel: 0.9, // viaje esquina → centro (s)
  transformFlash: 0.45, // pop de transformación a C-level (s)
  bubbleHold: 3, // globo del recién llegado visible (s)
  blockDrop: 0.5, // caída de cada bloque de la torre (s)
  blockStagger: 0.35, // separación entre bloques (s)
  winStamp: 0.6, // stamp de "¡WIN!" (s)
  confettiDuration: 2.5, // lluvia de confeti (s)
  nudgeAfter: 6, // segundos de inactividad para el nudge
  regroupDelay: 0.9, // pausa antes de reagruparse al borde (s)
  regroup: 0.7, // reagrupación al borde del tablero en building (s)
} as const
