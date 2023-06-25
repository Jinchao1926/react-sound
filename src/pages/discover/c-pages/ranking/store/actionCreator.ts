import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  fetchTopList,
  fetchPlaylistDetail
} from '@/services/ranking'
import {
  changeTopListAction,
  changeRankingPlaylistAction
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

export const fetchRankingDetailAsync = createAsyncThunk(
  "fetchRankingDetail",
  async (id: number, { dispatch }) => {
    try {
      const { playlist } = await fetchPlaylistDetail(id)
      dispatch(changeRankingPlaylistAction(playlist))
    } catch (error) {
      console.log("fetchRankingDetail error: ", error)
    }
  }
)