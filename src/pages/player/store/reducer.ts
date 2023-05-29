import { createSlice } from "@reduxjs/toolkit";
import { PlayMode } from "../type/PlayMode";
import { ILyric } from "@/utils/parser-lyric";

interface IPlayerState {
  // 当前歌曲
  currentSong?: any,
  // 播放列表
  playlist: any[],
  // 当前歌曲索引
  currentSongIndex: number,
  // 当前歌词
  currentLyric?: ILyric,
  // 当前播放歌词索引（第几行）
  lyricLineIndex: number,
  // 播放列表中，所有歌曲的歌词
  lyricList: ILyric[],
  // 播放模式
  playMode: PlayMode,
  // 是否正在播放音乐
  isPlaying: boolean,
}
const initialState: IPlayerState = {
  currentSong: null,
  playlist: [],
  currentSongIndex: -1,
  currentLyric: undefined,
  lyricLineIndex: 0,
  lyricList: [],
  playMode: PlayMode.Loop,
  isPlaying: false,
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSongAction(state, action) {
      state.currentSong = action.payload
    },
    changePlaylistAction(state, action) {
      state.playlist = action.payload
    },
    changeCurrentSongIndexAction(state, action) {
      state.currentSongIndex = action.payload
    },
    changeLyricLineIndexAction(state, action) {
      state.lyricLineIndex = action.payload
    },
    changeCurrentLyricAction(state, action) {
      state.currentLyric = action.payload
    },
    changeLyricListAction(state, action) {
      state.lyricList = action.payload
    },
    changePlayModeAction(state, action) {
      state.playMode = action.payload
    },
    changeIsPlayingAction(state, action) {
      state.isPlaying = action.payload
    }
  }
})

export const { 
  changeCurrentSongAction,
  changePlaylistAction,
  changeCurrentSongIndexAction,
  changeCurrentLyricAction,
  changeLyricLineIndexAction,
  changeLyricListAction,
  changePlayModeAction,
  changeIsPlayingAction
} = playerSlice.actions
export default playerSlice.reducer