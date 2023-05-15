import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
interface IRecommendState {
  banners: any[],
  hotRecommends: any[],
  newAlbums: any[],
  rankings: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: []
}

const recommendSlice = createSlice({
  name: "recommend",
  initialState: initialState,
  reducers: {
    changeBannersAction(state, action) {
      state.banners = action.payload
    },
    changeHotRecommendsAction(state, action) {
      state.hotRecommends = action.payload
    },
    changeNewAlbumsAction(state, action) {
      state.newAlbums = action.payload
    },
    changeRankingsAction(state, action) {
      state.rankings = action.payload
    }
  },
})
  
export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction,
  changeRankingsAction
} = recommendSlice.actions
export default recommendSlice.reducer
/* Reducer Ends */