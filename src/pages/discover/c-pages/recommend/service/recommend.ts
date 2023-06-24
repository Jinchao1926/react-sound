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

/* 获取新碟上架
{
    "songs": [],
    "paid": false,
    "onSale": false,
    "mark": 0,
    "awardTags": null,
    "companyId": 0,
    "blurPicUrl": "https://p2.music.126.net/vm7MusUO3hLF3jpCj7cKdg==/109951168596600156.jpg",
    "pic": 109951168596600160,
    "alias": [],
    "artists": [
        {
            "img1v1Id": 18686200114669624,
            "topicPerson": 0,
            "followed": false,
            "trans": "",
            "alias": [],
            "picId": 0,
            "briefDesc": "",
            "musicSize": 0,
            "albumSize": 0,
            "picUrl": "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
            "img1v1Url": "https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
            "name": "动物园钉子户",
            "id": 12118540,
            "img1v1Id_str": "18686200114669622"
        }
    ],
    "copyrightId": -1,
    "picId": 109951168596600160,
    "artist": {
        "img1v1Id": 18686200114669624,
        "topicPerson": 0,
        "followed": false,
        "trans": "",
        "alias": [],
        "picId": 109951167828275000,
        "briefDesc": "",
        "musicSize": 32,
        "albumSize": 8,
        "picUrl": "https://p2.music.126.net/NSt2TEuRJIsBkISMUlArsw==/109951167828275010.jpg",
        "img1v1Url": "https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
        "name": "动物园钉子户",
        "id": 12118540,
        "picId_str": "109951167828275010",
        "img1v1Id_str": "18686200114669622"
    },
    "briefDesc": "",
    "publishTime": 1684944000000,
    "company": "生煎唱片",
    "picUrl": "https://p2.music.126.net/vm7MusUO3hLF3jpCj7cKdg==/109951168596600156.jpg",
    "commentThreadId": "R_AL_3_165167252",
    "description": "",
    "tags": "",
    "status": 1,
    "subType": "录音室版",
    "name": "动物园钉子户Ⅱ",
    "id": 165167252,
    "type": "专辑",
    "size": 11,
    "picId_str": "109951168596600156"
}
*/
export function fetchTopAlbums(offset: number = 0, limit: number = 10, type: string = 'hot') {
  return rsRequest.get({
    url: '/album/new',
    params: {
      offset,
      limit,
      type
    }
  })
}

/* 
19723756: 云音乐飙升榜,
3779629：云音乐新歌榜,
2884035：云音乐原创榜,
*/

// 获取榜单详情，榜单也是歌单的一种
export function fetchPlaylistDetail(id: number) {
  return rsRequest.get({
    url: '/playlist/detail',
    params: {
      id
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