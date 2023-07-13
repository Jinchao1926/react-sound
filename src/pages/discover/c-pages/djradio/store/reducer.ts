import { createSlice } from "@reduxjs/toolkit";

interface IRadioState {
  categories: any[];        // 电台分类
  recommendPrograms: any[]; // 推荐节目
  rankedProgram: {updateTime: number, toplist: any[]};  // 节目排行榜
  recommendRadios: any[];   // 推荐电台
  pageHotRadios: any[][];   // 热门电台，二维数组，存放每一页的新碟
  hotTotal: number;         // 热门电台总数
}
const initialState: IRadioState = {
  categories: [],
  recommendPrograms: [],
  rankedProgram: {updateTime: 0, toplist: []},
  recommendRadios: [],
  pageHotRadios: [],
  hotTotal: 0
}

const radioSlice = createSlice({
  name: 'radio',
  initialState,
  reducers: {
    changeRadioCategoriesAction(state, action) {
      state.categories = action.payload
    },
    changeRecommendProgramsAction(state, action) {
      state.recommendPrograms = action.payload
    },
    changeRankedProgramsAction(state, action) {
      state.rankedProgram = action.payload
    },
    changeRecommendedRadiosAction(state, action) {
      state.recommendRadios = action.payload
    },
    changePageHotRadiosAction(state, action) {
      state.pageHotRadios = action.payload
    },
    changeHotTotalAction(state, action) {
      state.hotTotal = action.payload
    }
  }
})

export const { 
  changeRadioCategoriesAction, 
  changeRecommendProgramsAction,
  changeRankedProgramsAction,
  changeRecommendedRadiosAction,
  changePageHotRadiosAction,
  changeHotTotalAction
} = radioSlice.actions
export default radioSlice.reducer