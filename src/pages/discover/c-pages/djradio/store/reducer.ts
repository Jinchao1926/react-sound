import { createSlice } from "@reduxjs/toolkit";

interface IRadioState {
  categories: any[];
  recommendPrograms: any[];
  rankedProgram: {updateTime: number, toplist: any[]};
  radios: any[];
}
const initialState: IRadioState = {
  categories: [],
  recommendPrograms: [],
  rankedProgram: {updateTime: 0, toplist: []},
  radios: []
}

const radioSlice = createSlice({
  name: 'radio',
  initialState,
  reducers: {
    changeRadioCategories(state, action) {
      state.categories = action.payload
    },
    changeRecommendPrograms(state, action) {
      state.recommendPrograms = action.payload
    },
    changeRankedPrograms(state, action) {
      state.rankedProgram = action.payload
    },
    changeRadios(state, action) {
      state.radios = action.payload
    }
  }
})

export const { 
  changeRadioCategories, 
  changeRecommendPrograms,
  changeRankedPrograms,
  changeRadios 
} = radioSlice.actions
export default radioSlice.reducer