import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
interface IAlbumState {
  hotAlbums: any[];
  pageAlbums: any[][]; // 二维数组，存放每一页的新碟
  currentArea: string;
  total: number;
}
const initialState: IAlbumState = {
  hotAlbums: [],
  pageAlbums: [],
  currentArea: "ALL",
  total: 0
}

const albumSlice = createSlice({
  name: "album",
  initialState: initialState,
  reducers: {
    changeHotAlbumsAction(state, action) {
      state.hotAlbums = action.payload
    },
    changePageAlbumsAction(state, action) {
      state.pageAlbums = action.payload
    },
    changeCurrentAreaAction(state, action) {
      state.currentArea = action.payload
    },
    changeAlbumAmountAction(state, action) {
      state.total = action.payload
    }
  }
})

export const {
  changeHotAlbumsAction,
  changePageAlbumsAction,
  changeCurrentAreaAction,
  changeAlbumAmountAction
} = albumSlice.actions
export default albumSlice.reducer