import { useCallback, useEffect, useState } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'

import { usePlaylistDetailQuery } from '../playlist/usePlaylistDetailQuery'

/**
 * Hook for playing a playlist
 * @returns {Object} { play: The play function, isLoading, error }
 */
export const usePlayPlaylist = () => {
  const { playTracks } = usePlayerContext()
  const [playlistId, setPlaylistId] = useState<number>()

  const {
    data: playlist,
    isLoading,
    error,
  } = usePlaylistDetailQuery(playlistId)

  useEffect(() => {
    if (playlist?.tracks && playlist.tracks.length > 0) {
      playTracks(playlist.tracks)
    }
  }, [playlist, playTracks])

  // Method to trigger playlist playback
  const play = useCallback((id: number) => {
    setPlaylistId(id)
  }, [])

  return {
    play,
    isLoading,
    error,
  }
}
