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
import { getNextPlayMode } from '@/utils/player/playModes'

import { PlayerStorage } from '../utils/storages/playerStorage'

interface PlayerState {
  playlist: Track[]
  playMode: PlayModeType
  isPinned: boolean
  showPlaylist: boolean
  isPlaying: boolean
  currentTrack?: Track
  currentTrackIndex?: number
  currentLyric?: LyricLine[]
  currentLyricLineIndex: number
}

interface PlayerContextType {
  state: PlayerState
  // Playlist Management
  addToPlaylist: (track: Track) => void
  addTracksToPlaylist: (tracks: Track[]) => void
  removeFromPlaylist: (trackId: number) => void
  clearPlaylist: () => void
  // Play Mode
  switchPlayMode: () => void
  // Player UI Control
  togglePinned: () => void
  togglePlaylist: () => void
  // Playback Control
  playTrack: (track: Track) => void
  playTracks: (tracks: Track[], startIndex?: number) => void
  switchTrack: (nextTrack: boolean) => void
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
  const currentTrackIndex = getCurrentSongIndex()
  const currentTrack =
    currentTrackIndex !== undefined && currentTrackIndex < playlist.length
      ? playlist[currentTrackIndex]
      : undefined

  return {
    playlist,
    playMode,
    isPinned,
    showPlaylist: false,
    isPlaying: false,
    currentTrack,
    currentTrackIndex,
    currentLyric: undefined,
    currentLyricLineIndex: 0,
  }
}

export const PlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const lyricTrackIdRef = useRef<number | undefined>(undefined)

  const [state, setState] = useState<PlayerState>(getInitialState)
  const { data: lyricData } = useSongLyricQuery(lyricTrackIdRef.current)

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

  const addTracksToPlaylist = useCallback((tracks: Track[]) => {
    setState((prev) => {
      // 过滤掉已存在的歌曲
      const newTracks = tracks.filter(
        (track) => !prev.playlist.some((t) => t.id === track.id)
      )

      if (newTracks.length === 0) {
        return prev
      }

      const newPlaylist = [...prev.playlist, ...newTracks]
      PlayerStorage.setPlaylist(newPlaylist)

      return {
        ...prev,
        playlist: newPlaylist,
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
  const playTrack = useCallback((track: Track) => {
    setState((prev) => {
      if (!track) return prev

      let trackIndex = prev.playlist.findIndex((t) => t.id === track.id)
      let newPlaylist = prev.playlist

      if (trackIndex === -1) {
        // Add track to playlist if not already present
        newPlaylist = [...prev.playlist, track]
        trackIndex = newPlaylist.length - 1
        PlayerStorage.setPlaylist(newPlaylist)
      }

      PlayerStorage.setCurrentSongIndex(trackIndex)
      lyricTrackIdRef.current = track.id

      return {
        ...prev,
        playlist: newPlaylist,
        currentTrack: track,
        currentTrackIndex: trackIndex,
        isPlaying: true,
        currentLyric: undefined,
        currentLyricLineIndex: 0,
      }
    })
  }, [])

  const playTracks = useCallback((tracks: Track[], startIndex: number = 0) => {
    if (!tracks || tracks.length === 0) return

    setState((prev) => {
      const validIndex = Math.max(0, Math.min(startIndex, tracks.length - 1))
      const firstSong = tracks[validIndex]

      PlayerStorage.setPlaylist(tracks)
      PlayerStorage.setCurrentSongIndex(validIndex)
      lyricTrackIdRef.current = firstSong.id

      return {
        ...prev,
        playlist: tracks,
        currentTrack: firstSong,
        currentTrackIndex: validIndex,
        isPlaying: true,
        currentLyric: undefined,
        currentLyricLineIndex: 0,
      }
    })
  }, [])

  const switchTrack = useCallback((nextTrack: boolean) => {
    setState((prev) => {
      const { playMode, playlist, currentTrack } = prev
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack?.id
      )

      let switchedIndex: number
      let switchedTrack: Track | undefined
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
          switchedTrack = playlist[switchedIndex]
          break

        default:
          // Loop or single mode, switch in order
          switchedIndex = nextTrack
            ? (currentIndex + 1) % playlist.length
            : (currentIndex - 1 + playlist.length) % playlist.length
          switchedTrack = playlist[switchedIndex]
          break
      }

      PlayerStorage.setCurrentSongIndex(switchedIndex)
      lyricTrackIdRef.current = switchedTrack?.id

      return {
        ...prev,
        currentTrack: switchedTrack,
        currentTrackIndex: switchedIndex,
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

  const togglePlaylist = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showPlaylist: !prev.showPlaylist,
    }))
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
    addTracksToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    switchPlayMode,
    togglePinned,
    togglePlaylist,
    playTrack,
    playTracks,
    switchTrack,
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
