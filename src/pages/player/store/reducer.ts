import { createSlice } from "@reduxjs/toolkit";

interface IPlayerState {
  currentSong?: any
}
const initialState: IPlayerState = {
  currentSong: null
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSongAction(state, action) {
      state.currentSong = action.payload
    }
  }
})

export const { 
  changeCurrentSongAction 
} = playerSlice.actions
export default playerSlice.reducer