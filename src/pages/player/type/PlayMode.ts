export const PlayMode = {
  Loop: 'loop',
  Random: 'random',
  SingleLoop: 'single-loop',
} as const

export type PlayModeType = (typeof PlayMode)[keyof typeof PlayMode]

export function nextPlayMode(mode: PlayModeType) {
  switch (mode) {
    case PlayMode.Loop:
      return PlayMode.Random
    case PlayMode.Random:
      return PlayMode.SingleLoop
    case PlayMode.SingleLoop:
      return PlayMode.Loop
    default:
      return PlayMode.Loop
  }
}
