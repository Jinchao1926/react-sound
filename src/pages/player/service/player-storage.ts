import { getStorage, setStorage } from "@/utils/local-storage";
import { PlayMode } from "@/pages/player/type/PlayMode";

enum PlayerStorageKey {
  playlist = "playlist",
  playMode = "playMode",
  volume = "volume",
  currentSongIndex = "currentSongIndex",
}

// 播放列表
export const fetchPlaylist = () => {
  const storedPlaylist = getStorage(PlayerStorageKey.playlist)
  return storedPlaylist || []
}
export const storePlaylist = (playlist: any[]) => {
  setStorage(PlayerStorageKey.playlist, playlist)
}

// 播放模式
export const fetchPlayMode = () => {
  const storedPlayMode = getStorage(PlayerStorageKey.playMode)
  return storedPlayMode || PlayMode.Loop
}
export const storePlayMode = (playMode: PlayMode) => {
  setStorage(PlayerStorageKey.playMode, playMode)
}

// 当前歌曲索引
export const fetchCurrentSongIndex = () => {
  const storedCurrentSongIndex = getStorage(PlayerStorageKey.currentSongIndex)
  return storedCurrentSongIndex || -1
}
export const storeCurrentSongIndex = (currentSongIndex: number) => {
  setStorage(PlayerStorageKey.currentSongIndex, currentSongIndex)
}