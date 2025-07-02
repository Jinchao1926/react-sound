import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchTopAlbums } from '@/services/album'
import { fetchPlaylistDetail } from '@/services/ranking'

import {
  changeBannersAction,
  changeHotRecommendsAction,
  changeHotSingersAction,
  changeNewAlbumsAction,
  changeRankingsAction,
} from './reducer'
import {
  fetchBanners,
  fetchHotRecommends,
  fetchTopArtists,
} from '../service/recommend'

// 定义获取推荐列表数据的异步 Action
export const fetchRecommendDataAsync = createAsyncThunk(
  'fetchRecommendDatas',
  async (_, { dispatch }) => {
    try {
      const { banners } = await fetchBanners()
      dispatch(changeBannersAction(banners))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchBanners error: ', error)
    }

    try {
      const { result } = await fetchHotRecommends()
      dispatch(changeHotRecommendsAction(result))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchHotRecommends error: ', error)
    }

    try {
      const { albums } = await fetchTopAlbums()
      dispatch(changeNewAlbumsAction(albums))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchTopAlbums error: ', error)
    }
  }
)

/*
19723756: 云音乐飙升榜,
3779629：云音乐新歌榜,
2884035：云音乐原创榜,
*/
const RankingType = {
  Soaring: '19723756',
  NewSong: '3779629',
  Original: '2884035',
} as const

export const fetchRankingDataAsync = createAsyncThunk(
  'fetchRankingDatas',
  async (_, { dispatch }) => {
    // Object.values(), Enum value 为 string 和 number 结果不一样
    // https://bobbyhadz.com/blog/typescript-get-enum-values-as-array
    const rankingIds = Object.values(RankingType)
    const promises = rankingIds.map((id) => fetchPlaylistDetail(Number(id)))

    Promise.all(promises)
      .then((res) => {
        const rankings = res.map((item) => item.playlist)
        dispatch(changeRankingsAction(rankings))
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('fetchPlaylistDetail error: ', error)
      })
  }
)

export const fetchSingerDataAsync = createAsyncThunk(
  'fetchSingerDatas',
  async (_, { dispatch }) => {
    fetchTopArtists()
      .then((res) => {
        dispatch(changeHotSingersAction(res.artists))
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('fetchTopArtists error: ', error)
      })
  }
)
