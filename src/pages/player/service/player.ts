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
export function fetchLyric(id: string) {
  return rsRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}