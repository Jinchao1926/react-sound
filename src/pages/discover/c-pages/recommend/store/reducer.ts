import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
interface IRecommendState {
  banners: any[],
  hotRecommends: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: []
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
    }
  },
})
  
export const {
  changeBannersAction,
  changeHotRecommendsAction
} = recommendSlice.actions
export default recommendSlice.reducer
/* Reducer Ends */