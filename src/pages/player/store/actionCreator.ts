import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";

import { nextPlayMode } from "../type/PlayMode";

import { 
  changeCurrentSongAction,
  changeCurrentSongIndexAction, 
  changePlaylistAction,
  changePlayModeAction
} from "./reducer"

import { 
  fetchSongDetail 
} from "../service/player";

// 获取歌曲详情
export const fetchSongDetailAsync = createAsyncThunk<
  // return type of payload creator
  void,
  // first argument to payload creator
  string,
  // types for ThunkAPI
  { state: RootState }
>(
  "fetchSongDetail",
  async (id: string, { dispatch, getState }) => {
    // 1. 根据 id 查找歌曲是否在 playlist 中
    const playlist = getState().player.playlist
    const idx = playlist.findIndex(song => song.id === id)

    // 2. 如果在 playlist 中，就切换到该歌曲
    if (idx !== -1) {
      dispatch(changeCurrentSongAction(playlist[idx]))
      dispatch(changeCurrentSongIndexAction(idx))
      return
    }

    // 3. 如果不在 playlist 中，就请求歌曲详情
    try {
      const { songs } = await fetchSongDetail(id)
      if (!songs || !songs.length) return

      // 4. 将歌曲添加到 playlist 中
      const song = songs[0]
      const newPlaylist = [...playlist, song]
      dispatch(changePlaylistAction(newPlaylist))
      dispatch(changeCurrentSongIndexAction(newPlaylist.length - 1))
      dispatch(changeCurrentSongAction(song))
    } catch (error) {
      console.log("fetchSongDetail error: ", error)
    }
  }
)

// 添加歌曲到播放列表
export const addSongToPlaylistAction = createAsyncThunk<
  void,
  any,
  { state: RootState }
>(
  "addSongToPlaylist",
  async (song: any, { dispatch, getState }) => {
    // 歌曲不存在才添加到播放列表
    const playlist = getState().player.playlist
    const idx = playlist.findIndex(obj => obj.id === song.id)
    if (idx !== -1) return

    const newPlaylist = [...playlist, song]
    dispatch(changePlaylistAction(newPlaylist))
  }
)

// 切换歌曲模式
export const switchPlayModeAction = createAsyncThunk<
  void,
  void,
  { state: RootState }
>(
  "switchPlayMode",
  async (_, { dispatch, getState }) => {
    const playMode = getState().player.playMode

    const newPlayMode = nextPlayMode(playMode)
    dispatch(changePlayModeAction(newPlayMode))
  }
)

// 切换歌曲（上一首 / 下一首）
export const switchSongAction = createAsyncThunk<
  void,
  boolean,
  { state: RootState }
>(
  "switchSong",
  async (isForward: boolean, { dispatch, getState }) => {
    const playlist = getState().player.playlist
    const playMode = getState().player.playMode
    const currentSongIndex = getState().player.currentSongIndex

    // 播放列表为空，直接返回
    if (!playlist.length || playlist.length === 1) return

    let newSongIndex = currentSongIndex
    if (playMode === "random") {
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

    dispatch(changeCurrentSongIndexAction(newSongIndex))
    dispatch(changeCurrentSongAction(playlist[newSongIndex]))
  }
)

