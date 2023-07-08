import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from '@/store'
import { 
  fetchTopAlbums,
  fetchAlbums
} from '@/services/album'
import {
  changeHotAlbumsAction,
  changePageAlbumsAction,
  changeCurrentAreaAction,
  changeAlbumAmountAction
} from "./reducer";

import { areas } from '@/assets/data/local-data'

export const fetchHotAlbumsAsync = createAsyncThunk(
  "fetchHotAlbums",
  async (_, { dispatch }) => {
    try {
      const { albums }  = await fetchTopAlbums()
      dispatch(changeHotAlbumsAction(albums))
    } catch (error) {
      console.log("fetchHotAlbums error: ", error)
    }
  }
)

export const fetchAllAlbumsAsync = createAsyncThunk<
void,
number,
{ state: RootState }
>(
  "fetchAllAlbums",
  async ( page: number, { dispatch, getState }) => {
    try {
      const pageSize = 35
      const area = getState().album.currentArea
      const currentTotal = getState().album.total
      const offset = page * pageSize
      const { albums, total } = await fetchAlbums(area, offset, pageSize)

      // 初始化 albums
      if (total !== currentTotal) {
        const count = Math.ceil(total / pageSize)
        const pageAlbumss = new Array(count).fill([])
        pageAlbumss[page] = albums
        dispatch(changePageAlbumsAction(pageAlbumss))
        dispatch(changeAlbumAmountAction(total))
        return
      }
      
      // 将获取到的 albums 放入 pageAlbumss
      const currentPageAlbums = getState().album.pageAlbums
      const pageAlbumss = [...currentPageAlbums]
      pageAlbumss[page] = albums
      dispatch(changePageAlbumsAction(pageAlbumss))
    } catch (error) {
      console.log("fetchAlbums error: ", error)
    }
  }
)

export const changeCurrentAreaAsync = createAsyncThunk<
void,
string,
{ state: RootState }
>(
  "changeCurrentArea",
  async (areaName: string, { dispatch, getState }) => {
    try {
      const idx = areas.findIndex(area => area.name === areaName)
      if (idx === -1) return

      const areaCode = areas[idx].code
      console.log("areaCode:", areaCode)
      const currentArea = getState().album.currentArea
      if (currentArea === areaCode) return

      dispatch(changeCurrentAreaAction(areaCode))
      // 切换分类时，清空数据
      dispatch(changePageAlbumsAction([]))
      dispatch(changeAlbumAmountAction(0))
    } catch (error) {
      console.log("changeCurrentArea error: ", error)
    }
  }
)