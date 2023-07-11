import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";

import { 
  fetchRadioCategories, 
  fetchRecommendedPrograms,
  fetchRankedPrograms,
  fetchHotRadios 
} from "../service/djradio"
import { 
  changeRadioCategories,
  changeRecommendPrograms,
  changeRankedPrograms,
} from "./reducer"
import { resolve4 } from "dns";

// Fetch radio categories
export const fetchRadioCategorysAsync = createAsyncThunk<
  void,
  void,
  { state: RootState }
>(
  "fetchRadioCategories",
  async (_, { dispatch, getState }) => {
    const categories = getState().radio.categories
    if (categories.length > 0) return
    
    try {
      const { categories } = await fetchRadioCategories()
      dispatch(changeRadioCategories(categories))
    } catch (error) {
      console.log("fetchRadioCategories error: ", error)
    }
  }
)

// Fetch recommend programs
export const fetchRecommendProgramsAsync = createAsyncThunk<
  void,
  void,
  { state: RootState }
>(
  "fetchRecommendPrograms",
  async (_, { dispatch, getState }) => {
    const programs = getState().radio.recommendPrograms
    if (programs.length > 0) return
    
    try {
      const { programs } = await fetchRecommendedPrograms()
      dispatch(changeRecommendPrograms(programs))
    } catch (error) {
      console.log("fetchRecommendedPrograms error: ", error)
    }
  }
)

// Fetch ranked programs
export const fetchRankedProgramsAsync = createAsyncThunk<
  void,
  void,
  { state: RootState }
>(
  "fetchRankedPrograms",
  async (_, { dispatch, getState }) => {
    const programs = getState().radio.rankedProgram
    if (programs.toplist.length > 0) return
    
    try {
      const { updateTime, toplist} = await fetchRankedPrograms()
      dispatch(changeRankedPrograms({ updateTime, toplist }))
    } catch (error) {
      console.log("fetchRankedPrograms error: ", error)
    }
  }
)