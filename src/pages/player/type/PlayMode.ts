
export enum PlayMode {
  Loop = "loop",
  Random = "random",
  SingleLoop = "single-loop",
}

export function nextPlayMode(mode: PlayMode) {
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
