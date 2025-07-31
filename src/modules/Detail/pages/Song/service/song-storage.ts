import { parserLyric } from '@/utils/lyricsParser'
import { getStorage, setStorage } from '@/utils/storages/sessionStorage'

import {
  fetchLyric,
  fetchSimilarPlaylists,
  fetchSimilarSongs,
  fetchSongDetail,
} from './song'

const SongStorageTable = {
  song: 'song',
  lyric: 'lyric',
  similarPlaylists: 'similar_playlists',
  similarSongs: 'similar_songs',
} as const

// 获取歌曲（sessionStorage / request）
export const fetchSongAsync = async (id: string) => {
  const storedSong = getStorage(id, SongStorageTable.song)
  if (storedSong) return storedSong

  // request
  try {
    const { songs } = await fetchSongDetail(id)
    if (!songs || !songs.length) return

    const song = songs[0]
    setStorage(id, song, SongStorageTable.song)
    return song
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchSongDetail error: ', error)
    return null
  }
}

// 获取歌词（sessionStorage / request）
export const fetchLyricAsync = async (id: string) => {
  const storedLyric = getStorage(id, SongStorageTable.lyric)
  if (storedLyric) return storedLyric

  // request
  try {
    const { lrc } = await fetchLyric(id)
    const lyric = parserLyric(lrc.lyric)
    setStorage(id, lyric, SongStorageTable.lyric)
    return lyric
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchLyric error: ', error)
    return null
  }
}

// 获取相似歌单（sessionStorage / request）
export const fetchSimilarPlaylistsAsync = async (id: string) => {
  const storedSimilarPlaylists = getStorage(
    id,
    SongStorageTable.similarPlaylists
  )
  if (storedSimilarPlaylists) return storedSimilarPlaylists

  // request
  try {
    const { playlists } = await fetchSimilarPlaylists(id)
    setStorage(id, playlists, SongStorageTable.similarPlaylists)
    return playlists
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchSimilarPlaylists error: ', error)
    return null
  }
}

// 获取相似歌词（sessionStorage / request）
export const fetchSimilarSongsAsync = async (id: string) => {
  const storedSimilarSongs = getStorage(id, SongStorageTable.similarSongs)
  if (storedSimilarSongs) return storedSimilarSongs

  // request
  try {
    const { songs } = await fetchSimilarSongs(id)
    setStorage(id, songs, SongStorageTable.similarSongs)
    return songs
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('fetchSimilarSongs error: ', error)
    return null
  }
}
