import { useCallback, useEffect, useState } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'
import { type Track } from '@/types/track'
import { normalizeTrack } from '@/utils/track/normalizeTrack'

import { useRadioProgramsQuery } from '../program/useRadioProgramsQuery'

/**
 * Hook for playing a radio by loading all programs and playing their mainSongs
 * Leverages React Query caching for efficiency
 * @returns {Object} { play: The play function, isLoading, error }
 */
export const usePlayRadio = () => {
  const { playTracks } = usePlayerContext()
  const [radioId, setRadioId] = useState<number>()

  /*
  // Use fetchAll hook to automatically load all pages with caching
  const {
    data: programs,
    isLoading,
    error,
    isSuccess,
  } = useRadioProgramsFetchAll({
    radioId,
  }) */

  // Fetch 1000 programs once
  const {
    data: programs,
    isLoading,
    error,
  } = useRadioProgramsQuery({
    radioId,
    limit: 1000,
  })

  useEffect(() => {
    if (programs && programs.length > 0) {
      const tracks: Track[] = programs
        .map((program) => program.mainSong)
        .filter((song) => song !== null && song !== undefined)
        .map((song) => normalizeTrack(song))

      if (tracks.length > 0) {
        playTracks(tracks)
      }
    }
  }, [programs, playTracks])

  // Method to trigger radio playback
  const play = useCallback((id: number) => {
    setRadioId(id)
  }, [])

  return {
    play,
    isLoading,
    error,
  }
}
