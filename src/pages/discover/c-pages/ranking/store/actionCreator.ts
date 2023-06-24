import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchTopList
} from '../service/ranking'
import {
  changeTopListAction
} from './reducer'

export const fetchRankingDatasAsync = createAsyncThunk(
  "fetchRankingDatas",
  async (_, { dispatch }) => {
    try {
      const { list } = await fetchTopList()
      dispatch(changeTopListAction(list))
    } catch (error) {
      console.log("fetchRankingDatasAsync error: ", error)
    }
  }
)