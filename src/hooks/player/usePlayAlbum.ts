import { useCallback, useEffect, useState } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'
import { type Track } from '@/types/track'

import { useAlbumDetailQuery } from '../album/useAlbumDetailQuery'

/**
 * Hook for playing an album
 * @returns {Object} { play: The play function, isLoading, error }
 */
export const usePlayAlbum = () => {
  const { playTracks } = usePlayerContext()
  const [albumId, setAlbumId] = useState<number>()

  const { data: album, isLoading, error } = useAlbumDetailQuery(albumId)

  useEffect(() => {
    if (album?.songs && album.songs.length > 0) {
      const tracks: Track[] = album.songs.map((song) => ({
        ...song,
        al: album.album,
      }))
      playTracks(tracks)
    }
  }, [album, playTracks])

  // Method to trigger album playback
  const play = useCallback((id: number) => {
    setAlbumId(id)
  }, [])

  return {
    play,
    isLoading,
    error,
  }
}
