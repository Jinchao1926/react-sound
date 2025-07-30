export const PLAY_MODE = {
  LOOP: 'loop',
  RANDOM: 'random',
  SINGLE_LOOP: 'single-loop',
} as const

export type PlayModeType = (typeof PLAY_MODE)[keyof typeof PLAY_MODE]

export const getNextPlayMode = (currentMode: PlayModeType): PlayModeType => {
  switch (currentMode) {
    case PLAY_MODE.LOOP:
      return PLAY_MODE.RANDOM
    case PLAY_MODE.RANDOM:
      return PLAY_MODE.SINGLE_LOOP
    case PLAY_MODE.SINGLE_LOOP:
      return PLAY_MODE.LOOP
    default:
      return PLAY_MODE.LOOP
  }
}
