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
  addTracksToPlaylist: (tracks: Track[]) => void
  removeFromPlaylist: (songId: number) => void
  clearPlaylist: () => void
  // Play Mode
  switchPlayMode: () => void
  // Player UI Control
  togglePinned: () => void
  // Playback Control
  playSong: (song: Track) => void
  playTracks: (tracks: Track[], startIndex?: number) => void
  // playTracksWithSong: (tracks: Track[], song: Track) => void
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
  const playSong = useCallback((song: Track) => {
    setState((prev) => {
      if (!song) return prev

      let songIndex = prev.playlist.findIndex((track) => track.id === song.id)
      let newPlaylist = prev.playlist

      if (songIndex === -1) {
        // Add song to playlist if not already present
        newPlaylist = [...prev.playlist, song]
        songIndex = newPlaylist.length - 1
        PlayerStorage.setPlaylist(newPlaylist)
      }

      PlayerStorage.setCurrentSongIndex(songIndex)
      lyricSongIdRef.current = song.id

      return {
        ...prev,
        playlist: newPlaylist,
        currentSong: song,
        currentSongIndex: songIndex,
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
      lyricSongIdRef.current = firstSong.id

      return {
        ...prev,
        playlist: tracks,
        currentSong: firstSong,
        currentSongIndex: validIndex,
        isPlaying: true,
        currentLyric: undefined,
        currentLyricLineIndex: 0,
      }
    })
  }, [])

  // const playTracksWithSong = useCallback(
  //   (tracks: Track[], song: Track) => {
  //     if (!tracks || tracks.length === 0) return

  //     const index = tracks.findIndex((t) => t.id === song.id)
  //     playTracks(tracks, index >= 0 ? index : 0)
  //   },
  //   [playTracks]
  // )

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
    addTracksToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    switchPlayMode,
    togglePinned,
    playSong,
    playTracks,
    // playTracksWithSong,
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
