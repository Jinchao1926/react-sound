import { createSlice } from "@reduxjs/toolkit";
import { ILyric } from "@/utils/parser-lyric";

interface ISongState {
  // 当前歌曲
  song?: any,
  // 当前歌词
  lyric?: ILyric,
  // 歌曲评论
  comments: any[],
  // 相似歌单
  similarPlaylists: any[],
  // 相似歌曲
  similarSongs: any[]
}
const initialState: ISongState = {
  song: null,
  lyric: undefined,
  comments: [],
  similarPlaylists: [],
  similarSongs: []
}

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    changeSongAction(state, action) {
      state.song = action.payload
    },
    changeLyricAction(state, action) {
      state.lyric = action.payload
    },
    changeCommentsAction(state, action) {
      state.comments = action.payload
    },
    changeSimilarPlaylistsAction(state, action) {
      state.similarPlaylists = action.payload
    },
    changeSimilarSongsAction(state, action) {
      state.similarSongs = action.payload
    }
  }
})

export const { 
  changeSongAction,
  changeLyricAction,
  changeCommentsAction,
  changeSimilarPlaylistsAction,
  changeSimilarSongsAction
} = songSlice.actions
export default songSlice.reducer