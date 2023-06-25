import { createSlice } from "@reduxjs/toolkit";

interface IRankingState {
  topList: any[],
  currentFrequency: string | null,
  currentPlaylist: any,
}
const initState: IRankingState = {
  topList: [],
  currentFrequency: null,
  currentPlaylist: null
}

const rankingSlice = createSlice({
  name: "ranking",
  initialState: initState,
  reducers: {
    changeTopListAction(state, action) {
      state.topList = action.payload
    },
    changeRankingFrequencyAction(state, action) {
      state.currentFrequency = action.payload
    },
    changeRankingPlaylistAction(state, action) {
      state.currentPlaylist = action.payload
    }
  }
})

export const {
  changeTopListAction,
  changeRankingFrequencyAction,
  changeRankingPlaylistAction
} = rankingSlice.actions
export default rankingSlice.reducer