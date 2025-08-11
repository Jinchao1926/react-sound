import { PlayModeType } from '@/types/player'
import { Track } from '@/types/track'

import { getStorage, setStorage } from './localStorage'

const PLAYER_TABLE = 'Player'

const STORAGE_KEYS = {
  PLAYLIST: 'playlist',
  PLAY_MODE: 'playMode',
  PLAYER_PINNED: 'playerPinned',
  CURRENT_SONG_INDEX: 'currentSongIndex',
} as const

export const PlayerStorage = {
  getPlaylist: (): Track[] => {
    return getStorage<Track[]>(STORAGE_KEYS.PLAYLIST, PLAYER_TABLE) || []
  },
  setPlaylist: (playlist: Track[]): boolean => {
    return setStorage(STORAGE_KEYS.PLAYLIST, playlist, PLAYER_TABLE)
  },
  getPlayMode: (): PlayModeType => {
    return (
      getStorage<PlayModeType>(STORAGE_KEYS.PLAY_MODE, PLAYER_TABLE) || 'loop'
    )
  },
  setPlayMode: (playMode: PlayModeType): boolean => {
    return setStorage(STORAGE_KEYS.PLAY_MODE, playMode, PLAYER_TABLE)
  },
  getPlayerPinned: (): boolean => {
    return (
      getStorage<boolean>(STORAGE_KEYS.PLAYER_PINNED, PLAYER_TABLE) || false
    )
  },
  setPlayerPinned: (isPinned: boolean): boolean => {
    return setStorage(STORAGE_KEYS.PLAYER_PINNED, isPinned, PLAYER_TABLE)
  },
  getCurrentSongIndex: (): number | undefined => {
    return (
      getStorage<number>(STORAGE_KEYS.CURRENT_SONG_INDEX, PLAYER_TABLE) ??
      undefined
    )
  },
  setCurrentSongIndex: (index: number | undefined): boolean => {
    return setStorage(STORAGE_KEYS.CURRENT_SONG_INDEX, index, PLAYER_TABLE)
  },
}
