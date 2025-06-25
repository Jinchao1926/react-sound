import { createSlice } from '@reduxjs/toolkit'

import { IPlaylistCategory } from '@/utils/parser-playlist-category'

interface IPlaylistState {
  categories: IPlaylistCategory[] // 歌单分类
  currentCategory: string // 当前选中的分类
  total: number // 歌单总数
  pagePlaylists: any[][] // 二维数组，存放每一页的歌单
}
const initialState: IPlaylistState = {
  categories: [],
  currentCategory: '全部',
  total: 0,
  pagePlaylists: [],
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    changeCategories(state, action) {
      state.categories = action.payload
    },
    changeCurrentCategory(state, action) {
      state.currentCategory = action.payload
    },
    changePlaylistAmount(state, action) {
      state.total = action.payload
    },
    changePagePlaylists(state, action) {
      state.pagePlaylists = action.payload
    },
  },
})

export const {
  changeCategories,
  changeCurrentCategory,
  changePlaylistAmount,
  changePagePlaylists,
} = playlistSlice.actions
export default playlistSlice.reducer
