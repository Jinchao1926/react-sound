import { PLAY_MODE, PlayModeType } from '@/types/player'

export const getNextPlayMode = (currentMode: PlayModeType): PlayModeType => {
  const modes: PlayModeType[] = [
    PLAY_MODE.LOOP,
    PLAY_MODE.RANDOM,
    PLAY_MODE.SINGLE_LOOP,
  ]
  const idx = modes.indexOf(currentMode)
  return modes[(idx + 1) % modes.length]
}
