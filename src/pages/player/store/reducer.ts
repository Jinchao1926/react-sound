import { createSlice } from "@reduxjs/toolkit";
import { PlayMode } from "../type/PlayMode";
import { ILyric } from "@/utils/parser-lyric";

interface IPlayerState {
  currentSong?: any,
  playlist: any[],
  currentSongIndex: number,
  currentLyric?: ILyric,
  lyricLineIndex: number,
  lyricList: ILyric[],
  playMode: PlayMode,
}
const initialState: IPlayerState = {
  currentSong: null,
  playlist: [],
  currentSongIndex: -1,
  currentLyric: undefined,
  lyricLineIndex: 0,
  lyricList: [],
  playMode: PlayMode.Loop,
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
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer