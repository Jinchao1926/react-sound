import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
interface IRecommendState {
  banners: any[],
  hotRecommends: any[],
  newAlbums: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
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
    }
  },
})
  
export const {
  changeBannersAction,
  changeHotRecommendsAction,
  changeNewAlbumsAction
} = recommendSlice.actions
export default recommendSlice.reducer
/* Reducer Ends */