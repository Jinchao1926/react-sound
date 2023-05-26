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