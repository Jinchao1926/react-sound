import { StorageTable, getStorage, setStorage } from "@/utils/storage";
import { parserLyric } from "@/utils/parser-lyric";

import { 
  fetchSongDetail,
  fetchLyric,
  fetchSimilarPlaylists,
  fetchSimilarSongs,
} from "../service/song";

// 获取歌曲（sessionStorage / request）
export const fetchSongAsync = async (id: string) => {
  const storedSong = getStorage(id, StorageTable.song)
  if (storedSong) return storedSong
  
  // request
  try {
    const { songs } = await fetchSongDetail(id)
    if (!songs || !songs.length) return
    
    const song = songs[0]
    setStorage(id, song, StorageTable.song)
    return song
  } catch (error) {
    console.log("fetchSongDetail error: ", error)
    return null
  }
}

// 获取歌词（sessionStorage / request）
export const fetchLyricAsync = async (id: string) => {
  const storedLyric = getStorage(id, StorageTable.lyric)
  console.log("storedLyric:", storedLyric)
  if (storedLyric) return storedLyric
  
  // request
  try {
    const { lrc } = await fetchLyric(id)
    const lyric = parserLyric(lrc.lyric)
    setStorage(id, lyric, StorageTable.lyric)
    return lyric
  } catch (error) {
    console.log("fetchLyric error: ", error)
    return null
  }
}

// 获取相似歌单（sessionStorage / request）
export const fetchSimilarPlaylistsAsync = async (id: string) => {
  const storedSimilarPlaylists = getStorage(id, StorageTable.similarPlaylists)
  console.log("storedSimilarPlaylists:", storedSimilarPlaylists)
  if (storedSimilarPlaylists) return storedSimilarPlaylists
  
  // request
  try {
    const { playlists } = await fetchSimilarPlaylists(id)
    setStorage(id, playlists, StorageTable.similarPlaylists)
    return playlists
  } catch (error) {
    console.log("fetchSimilarPlaylists error: ", error)
    return null
  }
}

// 获取相似歌词（sessionStorage / request）
export const fetchSimilarSongsAsync = async (id: string) => {
  const storedSimilarSongs = getStorage(id, StorageTable.similarSongs)
  console.log("storedSimilarSongs:", storedSimilarSongs)
  if (storedSimilarSongs) return storedSimilarSongs
  
  // request
  try {
    const { songs } = await fetchSimilarSongs(id)
    setStorage(id, songs, StorageTable.similarSongs)
    return songs
  } catch (error) {
    console.log("fetchSimilarSongs error: ", error)
    return null
  }
}
