import { rsRequest } from "@/services";

// 获取歌曲详情
export function fetchSongDetail(id: string) {
  const ids = id
  return rsRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}
export function fetchSongsDetail(songIds: string[]) {
  const ids = songIds.join(',')
  return rsRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

// 获取歌词
export function fetchLyric(songId: string) {
  const id = songId
  return rsRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取相似歌单
export function fetchSimilarPlaylists(songId: string) {
  const id = songId
  return rsRequest.get({
    url: '/simi/playlist',
    params: {
      id
    }
  })
}

// 获取相似歌曲
export function fetchSimilarSongs(songId: string) {
  const id = songId
  return rsRequest.get({
    url: '/simi/song',
    params: {
      id
    }
  })
}