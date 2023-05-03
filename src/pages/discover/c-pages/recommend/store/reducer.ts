import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
interface IRecommendState {
  banners: any[]
}
const initialState: IRecommendState = {
  banners: []
}

const recommendSlice = createSlice({
  name: "recommend",
  initialState: initialState,
  reducers: {
    changeBannersAction(state, action) {
      state.banners = action.payload
    }
  },
})
  
export const {
  changeBannersAction
} = recommendSlice.actions
export default recommendSlice.reducer
/* Reducer Ends */