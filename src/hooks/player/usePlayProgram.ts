import { useCallback, useEffect, useState } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'
import { normalizeTrack } from '@/utils/track/normalizeTrack'

import { useProgramDetailQuery } from '../program/useProgramDetailQuery'

/**
 * Hook for playing a program
 * @returns {Object} { play: The play function, isLoading, error }
 */
export const usePlayProgram = () => {
  const { playTrack } = usePlayerContext()
  const [programId, setProgramId] = useState<number>()

  const { data: program, isLoading, error } = useProgramDetailQuery(programId)

  useEffect(() => {
    if (program?.mainSong) {
      playTrack(normalizeTrack(program.mainSong))
    }
  }, [program, playTrack])

  // Method to trigger program playback
  const play = useCallback((id: number) => {
    setProgramId(id)
  }, [])

  return {
    play,
    isLoading,
    error,
  }
}
