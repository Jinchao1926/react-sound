import { rsRequest } from "@/services"

// 歌单分类
export function fetchPlaylistCategories() {
  return rsRequest.get({
    url: '/playlist/catlist'
  })
}

// 歌单 ( 网友精选碟 )
export function fetchPlaylists(cat: string = '全部' , offset: number = 0, limit: number = 35) {
  return rsRequest.get({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset
    }
  })
}