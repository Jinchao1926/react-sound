import { createAsyncThunk } from "@reduxjs/toolkit";

import { 
  changeCurrentSongAction 
} from "./reducer"

import { 
  fetchSongDetail 
} from "../service/player";

// 获取歌曲详情
export const fetchSongDetailAsync = createAsyncThunk(
  "fetchSongDetail",
  async (id: string, { dispatch }) => {
    try {
      const { songs } = await fetchSongDetail(id)
      dispatch(changeCurrentSongAction(songs[0]))
    } catch (error) {
      console.log("fetchSongDetail error: ", error)
    }
  }
)