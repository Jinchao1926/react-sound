import { createAsyncThunk } from '@reduxjs/toolkit'

import { changeTopListAction, changeRankingPlaylistAction } from './reducer'
import { fetchTopList, fetchPlaylistDetail } from '@/services/ranking'

export const fetchRankingDatasAsync = createAsyncThunk(
  'fetchRankingDatas',
  async (_, { dispatch }) => {
    try {
      const { list } = await fetchTopList()
      dispatch(changeTopListAction(list))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchRankingDatasAsync error: ', error)
    }
  }
)

export const fetchRankingDetailAsync = createAsyncThunk(
  'fetchRankingDetail',
  async (id: number, { dispatch }) => {
    try {
      const { playlist } = await fetchPlaylistDetail(id)
      dispatch(changeRankingPlaylistAction(playlist))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchRankingDetail error: ', error)
    }
  }
)
