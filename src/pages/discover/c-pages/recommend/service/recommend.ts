import { rsRequest } from "@/services"

// 获取轮播图
export function fetchBanners() {
  return rsRequest.get({
    url: '/banner'
  })
}

/* 获取热门推荐歌单
{
    "id": 171037362,
    "type": 0,
    "name": "香港电影中的50首经典歌曲 [追忆录]",
    "copywriter": "",
    "picUrl": "https://p1.music.126.net/aRMEx-fiTudOmPIhkOe41g==/109951165493447833.jpg",
    "canDislike": true,
    "trackNumberUpdateTime": 1683686598757,
    "playCount": 42034440,
    "trackCount": 52,
    "highQuality": false,
    "alg": "alg_high_quality"
}
*/
export function fetchHotRecommends(limit: number = 8) {
  return rsRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 获取热门歌手
export function fetchTopArtists(offset: number = 0, limit: number = 5) {
  return rsRequest.get({
    url: '/top/artists',
    params: {
      offset,
      limit
    }
  })
}

// 热门歌手：/top/artists?offset=0&limit=30
// 歌手分类列表：/artist/list?type=1&area=96&initial=b