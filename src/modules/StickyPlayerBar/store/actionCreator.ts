import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchLyricAsync,
  fetchSongAsync,
} from '@/modules/Detail/pages/Song/service/song-storage'
import {
  fetchCurrentSongIndex,
  fetchPlayMode,
  fetchPlaylist,
  storeCurrentSongIndex,
  storePlayMode,
  storePlaylist,
} from '@/modules/StickyPlayerBar/service/player-storage'
import { RootState } from '@/store'
import { getNextPlayMode } from '@/utils/playMode'

import {
  changeCurrentLyricAction,
  changeCurrentSongAction,
  changeCurrentSongIndexAction,
  changeIsPlayingAction,
  changePlayModeAction,
  changePlaylistAction,
} from './reducer'
import { PLAY_MODE } from '../../../types/player'

// 获取播放器详情
export const fetchPlayerDataAsync = createAsyncThunk(
  'fetchPlayerData',
  async (_, { dispatch }) => {
    // 1. 请求播放列表
    const playlist = await fetchPlaylist()
    if (playlist) {
      dispatch(changePlaylistAction(playlist))
    }

    // 2. 请求播放模式
    const playMode = await fetchPlayMode()
    if (playMode) {
      dispatch(changePlayModeAction(playMode))
    }

    // 3. 请求当前播放歌词索引
    const idx = await fetchCurrentSongIndex()
    if (idx && idx < playlist.length) {
      dispatch(changeCurrentSongIndexAction(idx))
      dispatch(changeCurrentSongAction(playlist[idx]))
    }
  }
)

// 播放歌曲
export const playSongAction = createAsyncThunk<
  // return type of payload creator
  void,
  // first argument to payload creator
  string,
  // types for ThunkAPI
  { state: RootState }
>('playSong', async (id: string, { dispatch, getState }) => {
  // 1. 根据 id 查找歌曲是否在 playlist 中
  const playlist = getState().player.playlist
  const idx = playlist.findIndex((song) => song.id === id)

  // 2. 如果在 playlist 中，就切换到该歌曲
  if (idx !== -1) {
    storeCurrentSongIndex(idx)
    dispatch(changeCurrentSongIndexAction(idx))
    dispatch(changeCurrentSongAction(playlist[idx]))

    // 请求歌词
    const lyric = await fetchLyricAsync(id)
    if (lyric) {
      dispatch(changeCurrentLyricAction(lyric))
    }
    dispatch(changeIsPlayingAction(true))
    return
  }

  // 3. 如果不在 playlist 中，就请求歌曲详情
  const song = await fetchSongAsync(id)
  if (!song) return

  // 4. 将歌曲添加到 playlist 中
  const newPlaylist = [...playlist, song]
  storePlaylist(newPlaylist)
  storeCurrentSongIndex(newPlaylist.length - 1)
  dispatch(changePlaylistAction(newPlaylist))
  dispatch(changeCurrentSongIndexAction(newPlaylist.length - 1))
  dispatch(changeCurrentSongAction(song))

  // 5. 请求歌词
  const lyric = await fetchLyricAsync(id)
  if (lyric) {
    dispatch(changeCurrentLyricAction(lyric))
  }
  // 6. 播放歌曲
  dispatch(changeIsPlayingAction(true))
})

// 添加歌曲到播放列表
export const addSongToPlaylistAction = createAsyncThunk<
  void,
  any,
  { state: RootState }
>('addSongToPlaylist', async (song: any, { dispatch, getState }) => {
  // 歌曲不存在才添加到播放列表
  const playlist = getState().player.playlist
  const idx = playlist.findIndex((obj) => obj.id === song.id)
  if (idx !== -1) return

  const newPlaylist = [...playlist, song]
  dispatch(changePlaylistAction(newPlaylist))
  storePlaylist(newPlaylist)
})

// 切换歌曲模式
export const switchPlayModeAction = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('switchPlayMode', async (_, { dispatch, getState }) => {
  const playMode = getState().player.playMode

  const newPlayMode = getNextPlayMode(playMode)
  dispatch(changePlayModeAction(newPlayMode))
  storePlayMode(newPlayMode)
})

// 切换歌曲（上一首 / 下一首）
export const switchSongAction = createAsyncThunk<
  boolean,
  boolean,
  { state: RootState }
>('switchSong', async (isForward: boolean, { dispatch, getState }) => {
  const playlist = getState().player.playlist
  const playMode = getState().player.playMode
  const currentSongIndex = getState().player.currentSongIndex

  // 播放列表为空，直接返回
  if (!playlist.length || playlist.length === 1) return false

  let newSongIndex = currentSongIndex
  if (playMode === PLAY_MODE.RANDOM) {
    // 随机播放，不允许出现重复歌曲
    newSongIndex = Math.floor(Math.random() * playlist.length)
    if (newSongIndex === currentSongIndex) {
      newSongIndex = currentSongIndex + 1
    }
  } else {
    // 单曲循环和顺序播放
    if (currentSongIndex === -1) {
      newSongIndex = 0
    } else {
      newSongIndex = isForward ? currentSongIndex + 1 : currentSongIndex - 1
    }
  }

  // 边界处理
  if (newSongIndex < 0) {
    newSongIndex = playlist.length - 1
  } else if (newSongIndex >= playlist.length) {
    newSongIndex = 0
  }

  storeCurrentSongIndex(newSongIndex)
  dispatch(changeCurrentSongIndexAction(newSongIndex))
  dispatch(changeCurrentSongAction(playlist[newSongIndex]))
  // 请求歌词
  const lyric = await fetchLyricAsync(playlist[newSongIndex].id)
  if (lyric) {
    dispatch(changeCurrentLyricAction(lyric))
  }
  return true
})
