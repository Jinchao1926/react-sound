export const PLAY_MODE = {
  LOOP: 'loop',
  RANDOM: 'random',
  SINGLE_LOOP: 'single-loop',
} as const

export type PlayModeType = (typeof PLAY_MODE)[keyof typeof PLAY_MODE]
