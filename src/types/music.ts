/*
{
  "name": "林俊杰",
  "id": 3684,
  "picId": 109951168529051970,
  "img1v1Id": 109951168529049970,
  "briefDesc": "",
  "picUrl": "http://p2.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg",
  "img1v1Url": "http://p2.music.126.net/r6W-zCnV-aduVn_PLZYuYg==/109951168529049969.jpg",
  "albumSize": 70,
  "alias": [
    "JJ Lin",
    "Wayne Lim"
  ],
  "trans": "",
  "musicSize": 594,
  "topicPerson": 0,
  "showPrivateMsg": null,
  "isSubed": null,
  "accountId": null,
  "picId_str": "109951168529051968",
  "img1v1Id_str": "109951168529049969",
  "transNames": null,
  "followed": false,
  "mvSize": null,
  "publishTime": null,
  "identifyTag": null,
  "alg": null,
  "fansCount": null
}*/
/** 艺术家 */
export interface Artist {
  id: number
  accountId: number // user id
  name: string
  img1v1Url: string
  picUrl: string
  alias: string[]
  tns?: string[]
}

/*
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
/** 专辑 */
export interface Album {
  id: number
  name: string
  artist: Artist
  artists?: Artist[]
  picUrl: string
  alias: string[]
  tns?: string[]
  publishTime: number
  company: string
  description: string
}

/**
 {
    "onSale": false,
    "albumGameInfo": null,
    "commentCount": 215,
    "likedCount": 0,
    "shareCount": 1255,
    "isSub": false,
    "subTime": 0,
    "subCount": 4016,
    "code": 200
  }
 */
export interface AlbumDynamic {
  commentCount: number
  likedCount: number
  shareCount: number
  subCount: number
  isSub: boolean
}

/** 歌曲 */
export interface Song {
  id: number
  name: string
  artists: Artist[]
  album: Album
  duration: number
}
