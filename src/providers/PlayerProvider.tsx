import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { useSongDetailQuery } from '@/hooks/song/useSongDetailQuery'
import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { LyricLine } from '@/types/lyric'
import { PlayModeType } from '@/types/player'
import { Track } from '@/types/track'
import { getNextPlayMode } from '@/utils/playMode'

import { PlayerStorage } from '../utils/storages/playerStorage'

interface PlayerState {
  playlist: Track[]
  playMode: PlayModeType
  isPlaying: boolean
  currentSong?: Track
  currentSongIndex?: number
  currentLyric?: LyricLine[]
  currentLyricLineIndex?: number
}

interface PlayerContextType {
  state: PlayerState
  // Playlist Management
  addToPlaylist: (song: Track) => void
  removeFromPlaylist: (songId: number) => void
  clearPlaylist: () => void
  // Play Mode
  switchPlayMode: () => void
  // Playback Control
  playSong: (song: Track) => void
  switchSong: (next: boolean) => void
  togglePlayState: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

const getInitialState = (): PlayerState => {
  const { getPlaylist, getPlayMode, getCurrentSongIndex } = PlayerStorage
  const playlist = getPlaylist()
  const playMode = getPlayMode()
  const currentSongIndex = getCurrentSongIndex()
  const currentSong =
    currentSongIndex !== undefined && currentSongIndex < playlist.length
      ? playlist[currentSongIndex]
      : undefined

  return {
    playlist,
    playMode,
    isPlaying: false,
    currentSong,
    currentSongIndex,
    currentLyric: undefined,
    currentLyricLineIndex: undefined,
  }
}

export const PlayerProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const currentSongIdRef = useRef<number | undefined>(undefined)

  const [state, setState] = useState<PlayerState>(getInitialState)

  const { data: songData } = useSongDetailQuery(currentSongIdRef.current)
  const { data: lyricData } = useSongLyricQuery(currentSongIdRef.current)

  useEffect(() => {
    if (songData) {
      setState((prev) => ({
        ...prev,
        currentSong: songData,
        currentLyric: lyricData,
      }))
    }
  }, [songData, lyricData])

  // Playlist Management
  const addToPlaylist = useCallback((song: Track) => {
    setState((prev) => {
      const isAlreadyInPlaylist = prev.playlist.some(
        (track) => track.id === song.id
      )

      if (isAlreadyInPlaylist) {
        return prev
      }

      const newPlaylist = [...prev.playlist, song]
      PlayerStorage.setPlaylist(newPlaylist)

      return {
        ...prev,
        playlist: newPlaylist,
      }
    })
  }, [])

  const removeFromPlaylist = useCallback((songId: number) => {
    setState((prev) => {
      const isAlreadyInPlaylist = prev.playlist.some(
        (track) => track.id === songId
      )
      if (!isAlreadyInPlaylist) {
        return prev
      }

      const newPlaylist = prev.playlist.filter((song) => song.id !== songId)
      PlayerStorage.setPlaylist(newPlaylist)

      return {
        ...prev,
        playlist: newPlaylist,
      }
    })
  }, [])

  const clearPlaylist = useCallback(() => {
    setState((prev) => {
      PlayerStorage.setPlaylist([])
      PlayerStorage.setCurrentSongIndex(undefined)

      return {
        ...prev,
        playlist: [],
        currentSongIndex: undefined,
      }
    })
  }, [])

  // Play Mode
  const switchPlayMode = useCallback(() => {
    setState((prev) => {
      const newPlayMode = getNextPlayMode(prev.playMode)
      PlayerStorage.setPlayMode(newPlayMode)

      return {
        ...prev,
        playMode: newPlayMode,
      }
    })
  }, [])

  // Playback Control
  const playSong = useCallback(
    (song: Track) => {
      // currentSongIdRef.current = id
      setState((prev) => {
        if (!song) return prev

        const index = prev.playlist.findIndex((track) => track.id === song.id)
        if (index === -1) {
          // Add song to playlist if not already present
          addToPlaylist(song)
        }

        const songIndex = index >= 0 ? index : prev.playlist.length
        PlayerStorage.setCurrentSongIndex(songIndex)

        return {
          ...prev,
          currentSong: song,
          currentSongIndex: songIndex,
          isPlaying: true,
        }
      })
    },
    [addToPlaylist]
  )

  const switchSong = useCallback((next: boolean) => {
    setState((prev) => {
      const currentIndex = prev.playlist.findIndex(
        (track) => track.id === prev.currentSong?.id
      )
      const switchedIndex = next
        ? (currentIndex + 1) % prev.playlist.length
        : (currentIndex - 1 + prev.playlist.length) % prev.playlist.length
      const switchedSong = prev.playlist[switchedIndex]
      PlayerStorage.setCurrentSongIndex(switchedIndex)

      return {
        ...prev,
        currentSong: switchedSong,
        currentSongIndex: switchedIndex,
      }
    })
  }, [])

  const togglePlayState = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }))
  }, [])

  const contextValue: PlayerContextType = {
    state,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    switchPlayMode,
    playSong,
    switchSong,
    togglePlayState,
  }

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider')
  }
  return context
}
