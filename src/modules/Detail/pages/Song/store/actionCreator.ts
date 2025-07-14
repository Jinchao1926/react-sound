import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  changeSongAction,
  changeLyricAction,
  // changeCommentsAction,
  // changeSimilarPlaylistsAction,
  changeSimilarSongsAction,
} from './reducer'
import {
  fetchSongAsync,
  fetchLyricAsync,
  // fetchSimilarPlaylistsAsync,
  fetchSimilarSongsAsync,
} from '../service/song-storage'

// 获取歌曲详情
export const fetchSongDatasAsync = createAsyncThunk(
  'fetchSongDatas',
  async (id: string, { dispatch }) => {
    // 1. 请求歌曲详情
    const song = await fetchSongAsync(id)
    if (song) {
      dispatch(changeSongAction(song))
    }

    // 2. 请求歌词
    const lyric = await fetchLyricAsync(id)
    if (lyric) {
      dispatch(changeLyricAction(lyric))
    }

    // 3. 相似歌单
    // const playlists = await fetchSimilarPlaylistsAsync(id)
    // if (playlists) {
    //   dispatch(changeSimilarPlaylistsAction(playlists))
    // }

    // 4. 相似歌曲
    const songs = await fetchSimilarSongsAsync(id)
    if (songs) {
      dispatch(changeSimilarSongsAction(songs))
    }
  }
)
