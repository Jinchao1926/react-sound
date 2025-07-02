import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  changeRadioCategoriesAction,
  changeRecommendRadioCategoriesAction,
  changeRecommendProgramsAction,
  changeRankedProgramsAction,
  changeRecommendedRadiosAction,
  changePageHotRadiosAction,
  changeHotTotalAction,
} from './reducer'
import {
  fetchRadioCategories,
  // fetchRecommendedRadioCategories,
  fetchRecommendedPrograms,
  fetchRankedPrograms,
  fetchRecommendedRadios,
  fetchHotRadios,
} from '../service/djradio'
import { RootState } from '@/store'

// Fetch radio categories
export const fetchRadioCategoriesAsync = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('fetchRadioCategories', async (_, { dispatch, getState }) => {
  const categories = getState().radio.categories
  if (categories.length > 0) return

  try {
    const { categories } = await fetchRadioCategories()
    dispatch(changeRadioCategoriesAction(categories))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchRadioCategories error: ', error)
  }
})

// Fetch recommended categories
export const fetchRecommendedRadioCategoriesAsync = createAsyncThunk(
  'fetchRecommendedRadioCategories',
  async (_, { dispatch }) => {
    const recommendedIds = [2, 6, 3, 2001, 11]
    const promises = recommendedIds.map((id) => fetchRecommendedRadios(id))
    Promise.all(promises)
      .then((res) => {
        const array = res.map((item) => item.djRadios)
        dispatch(changeRecommendRadioCategoriesAction(array))
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('fetchRecommendedRadios error: ', error)
      })

    /*
    try {
      const { data } = await fetchRecommendedRadioCategories()

      let categories: any[] = []
      recommendedIds.forEach(id => {
        const el = data.find((item: {categoryId: number}) => item.categoryId === id)
        categories.push(el)
      })

      dispatch(changeRecommendRadioCategoriesAction(categories))
      
    } catch (error) {
      console.log("fetchRecommendedRadioCategories error: ", error)
    }*/
  }
)

// Programs
// Fetch recommend programs
export const fetchRecommendProgramsAsync = createAsyncThunk<
  void,
  boolean,
  { state: RootState }
>('fetchRecommendPrograms', async (small: boolean, { dispatch, getState }) => {
  const programs = getState().radio.recommendPrograms
  if (programs.length > 10) return

  try {
    const limit = small ? 11 : 50
    const { programs } = await fetchRecommendedPrograms(limit)
    dispatch(changeRecommendProgramsAction(programs))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchRecommendedPrograms error: ', error)
  }
})

// Fetch ranked programs
export const fetchRankedProgramsAsync = createAsyncThunk<
  void,
  boolean,
  { state: RootState }
>('fetchRankedPrograms', async (small: boolean, { dispatch, getState }) => {
  const programs = getState().radio.rankedProgram
  if (programs.toplist.length > 10) return

  try {
    const limit = small ? 10 : 100
    const { updateTime, toplist } = await fetchRankedPrograms(limit)
    dispatch(changeRankedProgramsAction({ updateTime, toplist }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchRankedPrograms error: ', error)
  }
})

// Radios
// Fetch recommended radios
export const fetchRecommendedRadiosAsync = createAsyncThunk(
  'fetchRecommendedRadios',
  async (type: number, { dispatch }) => {
    try {
      const { djRadios } = await fetchRecommendedRadios(type)
      dispatch(changeRecommendedRadiosAction(djRadios))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchRecommendedRadios error: ', error)
    }
  }
)

// Fetch hot radios
interface IFetchHotRadiosParams {
  categoryId: number
  page: number
}
export const fetchHotRadiosAsync = createAsyncThunk<
  void,
  IFetchHotRadiosParams,
  { state: RootState }
>(
  'fetchHotRadios',
  async (params: IFetchHotRadiosParams, { dispatch, getState }) => {
    try {
      const { categoryId, page } = params
      const pageSize = 30
      const currentTotal = getState().radio.hotTotal
      const offset = page * pageSize
      const { djRadios, count } = await fetchHotRadios(
        categoryId,
        offset,
        pageSize
      )

      // 初始化 hot radios
      if (count !== currentTotal) {
        const length = Math.ceil(count / pageSize)
        const pageRadios = new Array(length).fill([])
        pageRadios[page] = djRadios
        dispatch(changePageHotRadiosAction(pageRadios))
        dispatch(changeHotTotalAction(count))
        return
      }

      // 将获取到的 radios 放入 pageRadios
      const currentPageRadioss = getState().radio.pageHotRadios
      const pageRadios = [...currentPageRadioss]
      pageRadios[page] = djRadios
      dispatch(changePageHotRadiosAction(pageRadios))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchHotRadios error: ', error)
    }
  }
)
