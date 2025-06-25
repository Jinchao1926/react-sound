import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  changeCategories,
  changeCurrentCategory,
  changePlaylistAmount,
  changePagePlaylists,
} from './reducer'
import { fetchPlaylistCategories, fetchPlaylists } from '../service/playlist'
import { RootState } from '@/store'
import { parserPlaylistCategory } from '@/utils/parser-playlist-category'

export const fetchPlaylistCategoriesAsync = createAsyncThunk(
  'fetchPlaylistCategories',
  async (_, { dispatch }) => {
    try {
      const res = await fetchPlaylistCategories()
      const categories = parserPlaylistCategory(res)
      dispatch(changeCategories(categories))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('fetchPlaylistCategories error: ', error)
    }
  }
)

export const changeCurrentCategoryAsync = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('changeCurrentCategory', async (category: string, { dispatch, getState }) => {
  try {
    const currentCategory = getState().playlist.currentCategory
    if (currentCategory === category) return

    dispatch(changeCurrentCategory(category))
    // 切换分类时，清空数据
    dispatch(changePagePlaylists([]))
    dispatch(changePlaylistAmount(0))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('changeCurrentCategory error: ', error)
  }
})

export const fetchPlaylistsAsync = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('fetchPlaylists', async (page: number, { dispatch, getState }) => {
  try {
    const pageSize = 35
    const currentCategory = getState().playlist.currentCategory
    const currentTotal = getState().playlist.total
    const offset = page * pageSize
    const { playlists, total } = await fetchPlaylists(
      currentCategory,
      offset,
      pageSize
    )

    // 初始化 pagePlaylists
    if (total !== currentTotal) {
      const count = Math.ceil(total / pageSize)
      const pagePlaylists = new Array(count).fill([])
      pagePlaylists[page] = playlists
      dispatch(changePagePlaylists(pagePlaylists))
      dispatch(changePlaylistAmount(total))
      return
    }

    // 将获取到的 playlists 放入 pagePlaylists
    const currentPagePlaylists = getState().playlist.pagePlaylists
    const pagePlaylists = [...currentPagePlaylists]
    pagePlaylists[page] = playlists
    dispatch(changePagePlaylists(pagePlaylists))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchPlaylists error: ', error)
  }
})
