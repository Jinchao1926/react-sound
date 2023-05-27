import { createSlice } from "@reduxjs/toolkit";
import { PlayMode } from "../type/PlayMode";

interface IPlayerState {
  currentSong?: any,
  playlist: any[],
  currentSongIndex: number,
  playMode: PlayMode,
}
const initialState: IPlayerState = {
  currentSong: null,
  playlist: [],
  currentSongIndex: -1,
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
    changePlayModeAction(state, action) {
      state.playMode = action.payload
    }
  }
})

export const { 
  changeCurrentSongAction,
  changePlaylistAction,
  changeCurrentSongIndexAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer