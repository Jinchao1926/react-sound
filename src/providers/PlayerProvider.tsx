import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import type { FC, PropsWithChildren } from 'react'

import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { type LyricLine } from '@/types/lyric'
import { PLAY_MODE, type PlayModeType } from '@/types/player'
import { type Track } from '@/types/track'
import { getNextPlayMode } from '@/utils/playModes'

import { PlayerStorage } from '../utils/storages/playerStorage'

interface PlayerState {
  playlist: Track[]
  playMode: PlayModeType
  isPinned: boolean
  isPlaying: boolean
  currentSong?: Track
  currentSongIndex?: number
  currentLyric?: LyricLine[]
  currentLyricLineIndex: number
}

interface PlayerContextType {
  state: PlayerState
  // Playlist Management
  addToPlaylist: (song: Track) => void
  removeFromPlaylist: (songId: number) => void
  clearPlaylist: () => void
  // Play Mode
  switchPlayMode: () => void
  // Player UI Control
  togglePinned: () => void
  // Playback Control
  playSong: (song: Track) => void
  switchSong: (nextTrack: boolean) => void
  togglePlayState: () => void
  // Lyric
  changeLyricLineIndex: (index: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

const getInitialState = (): PlayerState => {
  const { getPlaylist, getPlayMode, getPlayerPinned, getCurrentSongIndex } =
    PlayerStorage
  const playlist = getPlaylist()
  const playMode = getPlayMode()
  const isPinned = getPlayerPinned()
  const currentSongIndex = getCurrentSongIndex()
  const currentSong =
    currentSongIndex !== undefined && currentSongIndex < playlist.length
      ? playlist[currentSongIndex]
      : undefined

  return {
    playlist,
    playMode,
    isPinned,
    isPlaying: false,
    currentSong,
    currentSongIndex,
    currentLyric: undefined,
    currentLyricLineIndex: 0,
  }
}

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const lyricSongIdRef = useRef<number | undefined>(undefined)

  const [state, setState] = useState<PlayerState>(getInitialState)
  const { data: lyricData } = useSongLyricQuery(lyricSongIdRef.current)

  useEffect(() => {
    if (lyricData.length) {
      setState((prev) => ({
        ...prev,
        currentLyric: lyricData,
      }))
    }
  }, [lyricData])

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
      const playMode = getNextPlayMode(prev.playMode)
      PlayerStorage.setPlayMode(playMode)

      return {
        ...prev,
        playMode,
      }
    })
  }, [])

  // Playback Control
  const playSong = useCallback(
    (song: Track) => {
      setState((prev) => {
        if (!song) return prev

        const index = prev.playlist.findIndex((track) => track.id === song.id)
        if (index === -1) {
          // Add song to playlist if not already present
          addToPlaylist(song)
        }

        const songIndex = index >= 0 ? index : prev.playlist.length
        PlayerStorage.setCurrentSongIndex(songIndex)
        lyricSongIdRef.current = song.id

        return {
          ...prev,
          currentSong: song,
          currentSongIndex: songIndex,
          isPlaying: true,
          currentLyricLineIndex: 0,
        }
      })
    },
    [addToPlaylist]
  )

  const switchSong = useCallback((nextTrack: boolean) => {
    setState((prev) => {
      const { playMode, playlist, currentSong } = prev
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentSong?.id
      )

      let switchedIndex: number
      let switchedSong: Track | undefined
      switch (playMode) {
        case PLAY_MODE.RANDOM:
          // Random mode, choose a random song (not repeating current)
          if (playlist.length === 1) {
            switchedIndex = 0
          } else {
            let randomIndex = Math.floor(Math.random() * playlist.length)
            if (randomIndex === currentIndex) {
              randomIndex = currentIndex + 1
            }
            switchedIndex = randomIndex % playlist.length
          }
          switchedSong = playlist[switchedIndex]
          break

        default:
          // Loop or single mode, switch in order
          switchedIndex = nextTrack
            ? (currentIndex + 1) % playlist.length
            : (currentIndex - 1 + playlist.length) % playlist.length
          switchedSong = playlist[switchedIndex]
          break
      }

      PlayerStorage.setCurrentSongIndex(switchedIndex)
      lyricSongIdRef.current = switchedSong?.id

      return {
        ...prev,
        currentSong: switchedSong,
        currentSongIndex: switchedIndex,
        currentLyricLineIndex: 0,
      }
    })
  }, [])

  const togglePlayState = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }))
  }, [])

  // Player UI Control
  const togglePinned = useCallback(() => {
    setState((prev) => {
      const isPinned = !prev.isPinned
      PlayerStorage.setPlayerPinned(isPinned)

      return {
        ...prev,
        isPinned,
      }
    })
  }, [])

  // Lyric
  const changeLyricLineIndex = useCallback((index: number) => {
    setState((prev) => {
      if (!prev.currentLyric) return prev

      let idx = Math.max(index, 0)
      idx = Math.min(idx, prev.currentLyric.length - 1)

      return {
        ...prev,
        currentLyricLineIndex: idx,
      }
    })
  }, [])

  const contextValue: PlayerContextType = {
    state,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    switchPlayMode,
    togglePinned,
    playSong,
    switchSong,
    togglePlayState,
    changeLyricLineIndex,
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
