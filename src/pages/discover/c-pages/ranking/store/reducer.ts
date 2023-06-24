import { createSlice } from "@reduxjs/toolkit";

interface IRankingState {
  topList: any[]
}
const initState: IRankingState = {
  topList: []
}

const rankingSlice = createSlice({
  name: "ranking",
  initialState: initState,
  reducers: {
    changeTopListAction(state, action) {
      state.topList = action.payload
    }
  }
})

export const {
  changeTopListAction
} = rankingSlice.actions
export default rankingSlice.reducer