import { type Artist } from './music'

/*
{
    "id": 349989,
    "name": "我不知道爱是什么",
    "artistId": 167006,
    "artistName": "艾怡良",
    "briefDesc": "",
    "desc": "",
    "cover": "http://p1.music.126.net/l3XVLOlpVDu7dxMNjGLEXA==/6630055116379298.jpg",
    "coverId_str": "6630055116379298",
    "coverId": 6630055116379298,
    "playCount": 73597,
    "subCount": 573,
    "shareCount": 120,
    "commentCount": 52,
    "duration": 292530,
    "nType": 0,
    "publishTime": "2014-10-13",
    "price": null,
    "brs": [
        {
            "size": 13879146,
            "br": 240,
            "point": 0
        },
        {
            "size": 31791948,
            "br": 480,
            "point": 0
        },
        {
            "size": 58996404,
            "br": 720,
            "point": 0
        },
        {
            "size": 120615536,
            "br": 1080,
            "point": 0
        }
    ],
    "artists": [
        {
            "id": 167006,
            "name": "艾怡良",
            "img1v1Url": "http://p1.music.126.net/fpM9b_sHvvl8JHY2AyUkDw==/109951170330072180.jpg",
            "followed": false
        }
    ],
    "commentThreadId": "R_MV_5_349989",
    "videoGroup": [
        {
            "id": 12100,
            "name": "流行",
            "type": 0
        },
        {
            "id": 5100,
            "name": "音乐",
            "type": 0
        },
        {
            "id": 8100,
            "name": "Showtime",
            "type": 0
        }
    ]
} */
export interface MV {
  id: number
  name: string
  artistId: number
  artistName: string
  cover: string
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: number
  publishTime: string
  artists: Artist[]
  brs: {
    size: number
    br: number
  }[]
}

/*
{
    "id": 22792682,
    "name": "Sacrifice（争）（2025英雄联盟全球总决赛主题曲）",
    "status": 0,
    "artistName": "英雄联盟",
    "imgurl": "http://p1.music.126.net/cOjvV3gA7YL5OtPLgXjDZg==/109951172144930423.jpg",
    "imgurl16v9": "http://p1.music.126.net/VHyXQMd7mUrqED6FrOM4sg==/109951172144930896.jpg",
    "artist": {
        "img1v1Id": 18686200114669624,
        "topicPerson": 0,
        "picId": 0,
        "alias": [],
        "briefDesc": "",
        "picUrl": "",
        "img1v1Url": "http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
        "albumSize": 0,
        "trans": "",
        "musicSize": 0,
        "name": "英雄联盟",
        "id": 1047337,
        "img1v1Id_str": "18686200114669622"
    },
    "duration": 241000,
    "playCount": 65499,
    "publishTime": "2025-10-13",
    "subed": false
}
*/

export interface MV2 {
  id: number
  name: string
  artistId: number
  artistName: string
  imgurl: string
  imgurl16v9: string
  playCount: number
  duration: number
  publishTime: string
  artists: Artist[]
}

/*
{
    "id": 349989,
    "url": "http://vodkgeyttp8.vod.126.net/cloudmusic/IyQhMSAyIDBgMDUmISFiIQ==/mv/349989/30cdeb0e52a60a45298e8eef1757a53a.mp4?wsSecret=e00da529da2efd0a406fb0f93249f2c2&wsTime=1764729475",
    "r": 1080,
    "size": 120615536,
    "md5": "",
    "code": 200,
    "expi": 3600,
    "fee": 0,
    "mvFee": 0,
    "st": 0,
    "promotionVo": null,
    "msg": ""
}
*/
export interface MVUrl {
  id: number
  url: string
  r: number
  size: number
}
