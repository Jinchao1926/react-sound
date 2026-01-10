import { describe, it, expect } from 'vitest'

import { PLAY_MODE, type PlayModeType } from '@/types/player'

import { getNextPlayMode } from './playModes'

describe('playModes utils', () => {
  describe('getNextPlayMode', () => {
    it('should cycle through play modes: LOOP -> RANDOM -> SINGLE_LOOP -> LOOP', () => {
      expect(getNextPlayMode(PLAY_MODE.LOOP)).toBe(PLAY_MODE.RANDOM)
      expect(getNextPlayMode(PLAY_MODE.RANDOM)).toBe(PLAY_MODE.SINGLE_LOOP)
      expect(getNextPlayMode(PLAY_MODE.SINGLE_LOOP)).toBe(PLAY_MODE.LOOP)
    })

    it('should handle full cycle', () => {
      let mode: PlayModeType = PLAY_MODE.LOOP
      mode = getNextPlayMode(mode) // RANDOM
      mode = getNextPlayMode(mode) // SINGLE_LOOP
      mode = getNextPlayMode(mode) // LOOP (back to start)
      expect(mode).toBe(PLAY_MODE.LOOP)
    })
  })
})
