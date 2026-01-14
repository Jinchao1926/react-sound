/** VIP
 {
    "name": "富士山下",
    "mainTitle": null,
    "additionalTitle": null,
    "id": 65766,
    "pst": 0,
    "t": 0,
    "ar": [
        {
            "id": 2116,
            "name": "陈奕迅",
            "tns": [],
            "alias": []
        }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "600902000001108413",
    "fee": 1,
    "v": 206,
    "crbt": null,
    "cf": "",
    "al": {
        "id": 6451,
        "name": "What's Going On…?",
        "picUrl": "https://p1.music.126.net/oSMs7RzJFx0TgWCqRC8XjA==/109951171844247587.jpg",
        "tns": [],
        "pic_str": "109951171844247587",
        "pic": 109951171844247580
    },
    "dt": 258902,
    "h": {
        "br": 320000,
        "fid": 0,
        "size": 10359162,
        "vd": -32859,
        "sr": 44100
    },
    "m": {
        "br": 192000,
        "fid": 0,
        "size": 6215515,
        "vd": -30259,
        "sr": 44100
    },
    "l": {
        "br": 128000,
        "fid": 0,
        "size": 4143691,
        "vd": -28666,
        "sr": 44100
    },
    "sq": {
        "br": 1567785,
        "fid": 0,
        "size": 50737963,
        "vd": -32910,
        "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "01",
    "no": 5,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 17179877376,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 172,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "awardTags": null,
    "displayTags": null,
    "markTags": [],
    "single": 0,
    "noCopyrightRcmd": null,
    "mv": 303140,
    "mst": 9,
    "cp": 7003,
    "rurl": null,
    "rtype": 0,
    "publishTime": 1164211200000
} 
/** 非VIP
{
    "name": "灰姑娘",
    "mainTitle": null,
    "additionalTitle": null,
    "id": 255589,
    "pst": 0,
    "t": 0,
    "ar": [
        {
            "id": 8329,
            "name": "梁咏琪",
            "tns": [],
            "alias": []
        }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 64,
    "crbt": null,
    "cf": "",
    "al": {
        "id": 25528,
        "name": "花火",
        "picUrl": "https://p2.music.126.net/OD5mxXU1eRYPfOCOkuYvRg==/109951165529533415.jpg",
        "tns": [],
        "pic_str": "109951165529533415",
        "pic": 109951165529533400
    },
    "dt": 212200,
    "h": {
        "br": 320000,
        "fid": 0,
        "size": 8490885,
        "vd": -37190,
        "sr": 44100
    },
    "m": {
        "br": 192000,
        "fid": 0,
        "size": 5094548,
        "vd": -34597,
        "sr": 44100
    },
    "l": {
        "br": 128000,
        "fid": 0,
        "size": 3396380,
        "vd": -32880,
        "sr": 44100
    },
    "sq": {
        "br": 906398,
        "fid": 0,
        "size": 24042230,
        "vd": -37184,
        "sr": 44100
    },
    "hr": null,
    "a": null,
    "cd": "1",
    "no": 3,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 1,
    "s_id": 0,
    "mark": 17179877376,
    "originCoverType": 1,
    "originSongSimpleData": null,
    "tagPicList": null,
    "resourceState": true,
    "version": 30,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "awardTags": null,
    "displayTags": null,
    "markTags": [],
    "single": 0,
    "noCopyrightRcmd": null,
    "mv": 0,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": -1,
    "publishTime": 1423497600000
}    
*/

import { type Album, type Artist } from './music'

/**
 * 付费类型 - 歌曲付费/权限状态
 * 表示歌曲是否需要 VIP 会员或购买
 */
export enum FeeType {
  /** 免费 - 无需付费，所有用户可播放 */
  Free = 0,
  /** VIP 专享 - 需要 VIP 会员才能播放 */
  VIP = 1,
  /** 需购买专辑 - 需要购买专辑才能播放 */
  AlbumPurchase = 4,
  /** 限时免费 - 非会员可播放低音质，VIP 可播放高音质 */
  LimitedFree = 8,
}

/** 曲目 */
export interface Track {
  id: number
  name: string
  // 时长，毫秒
  dt: number
  // 歌手信息
  ar: Artist[]
  // 专辑信息
  al: Album
  // Track Name Supplement - 曲目名称补充
  tns?: string[]
  alia: string[]
  mv: number
  // 付费类型，参考 FeeType 枚举
  fee?: FeeType
  // 用于表示各种曲目属性（VIP、独家、高品质等）的位标志
  mark?: number
}

export interface Track2 extends Omit<Track, 'ar' | 'al'> {
  duration: number
  artists: Artist[]
  album: Album
  transNames?: string[]
  mvid: number
}

/*
{
    "starred": false,
    "popularity": 100,
    "starredNum": 0,
    "playedNum": 0,
    "dayPlays": 0,
    "hearTime": 0,
    "mp3Url": "http://m2.music.126.net/hmZoNQaqzZALvVp0rE7faA==/0.mp3",
    "rtUrls": null,
    "mark": 17716748288,
    "noCopyrightRcmd": null,
    "originCoverType": 2,
    "originSongSimpleData": {
        "songId": 185700,
        "name": "思念是一种病",
        "artists": [
            {
                "id": 6453,
                "name": "张震岳"
            },
            {
                "id": 7214,
                "name": "蔡健雅"
            }
        ],
        "albumMeta": {
            "id": 18878,
            "name": "OK"
        }
    },
    "songJumpInfo": null,
    "artists": [
        {
            "img1v1Id": 18686200114669624,
            "topicPerson": 0,
            "picId": 0,
            "musicSize": 0,
            "albumSize": 0,
            "briefDesc": "",
            "picUrl": "",
            "img1v1Url": "https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
            "followed": false,
            "trans": "",
            "alias": [],
            "name": "单依纯",
            "id": 29802127,
            "img1v1Id_str": "18686200114669622"
        }
    ],
    "copyrightId": 4586661,
    "album": {
        "songs": [],
        "paid": false,
        "onSale": false,
        "mark": 0,
        "awardTags": null,
        "displayTags": null,
        "artists": [
            {
                "img1v1Id": 18686200114669624,
                "topicPerson": 0,
                "picId": 0,
                "musicSize": 0,
                "albumSize": 0,
                "briefDesc": "",
                "picUrl": "",
                "img1v1Url": "https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
                "followed": false,
                "trans": "",
                "alias": [],
                "name": "歌手2025",
                "id": 34299694,
                "img1v1Id_str": "18686200114669622"
            }
        ],
        "copyrightId": 4586661,
        "picId": 109951171366805170,
        "artist": {
            "img1v1Id": 18686200114669624,
            "topicPerson": 0,
            "picId": 0,
            "musicSize": 0,
            "albumSize": 0,
            "briefDesc": "",
            "picUrl": "",
            "img1v1Url": "https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg",
            "followed": false,
            "trans": "",
            "alias": [],
            "name": "",
            "id": 0,
            "img1v1Id_str": "18686200114669622"
        },
        "briefDesc": "",
        "publishTime": 1751040000000,
        "company": "芒果TV",
        "picUrl": "https://p1.music.126.net/RKL82QpIzPLwmXp256yT1A==/109951171366805167.jpg",
        "commentThreadId": "R_AL_3_276538125",
        "blurPicUrl": "https://p1.music.126.net/RKL82QpIzPLwmXp256yT1A==/109951171366805167.jpg",
        "companyId": 0,
        "pic": 109951171366805170,
        "status": 1,
        "subType": "现场版",
        "alias": [],
        "description": "",
        "tags": "",
        "name": "歌手2025 第7期",
        "id": 276538125,
        "type": "专辑",
        "size": 14,
        "picId_str": "109951171366805167"
    },
    "score": 100,
    "hMusic": {
        "volumeDelta": -30878,
        "playTime": 307626,
        "bitrate": 320000,
        "dfsId": 0,
        "sr": 48000,
        "name": "",
        "id": 12528896777,
        "size": 12307245,
        "extension": "mp3"
    },
    "mMusic": {
        "volumeDelta": -28297,
        "playTime": 307626,
        "bitrate": 192000,
        "dfsId": 0,
        "sr": 48000,
        "name": "",
        "id": 12528896779,
        "size": 7384365,
        "extension": "mp3"
    },
    "lMusic": {
        "volumeDelta": -26596,
        "playTime": 307626,
        "bitrate": 128000,
        "dfsId": 0,
        "sr": 48000,
        "name": "",
        "id": 12528896772,
        "size": 4922925,
        "extension": "mp3"
    },
    "audition": null,
    "copyFrom": "",
    "ringtone": "",
    "disc": "01",
    "no": 4,
    "fee": 8,
    "commentThreadId": "R_SO_4_2720029246",
    "mvid": 0,
    "crbt": null,
    "rtUrl": null,
    "ftype": 0,
    "bMusic": {
        "volumeDelta": -26596,
        "playTime": 307626,
        "bitrate": 128000,
        "dfsId": 0,
        "sr": 48000,
        "name": "",
        "id": 12528896772,
        "size": 4922925,
        "extension": "mp3"
    },
    "sqMusic": {
        "volumeDelta": -30856,
        "playTime": 307626,
        "bitrate": 949065,
        "dfsId": 0,
        "sr": 48000,
        "name": "",
        "id": 12528896775,
        "size": 36500340,
        "extension": "flac"
    },
    "hrMusic": {
        "volumeDelta": -30856,
        "playTime": 307626,
        "bitrate": 1719315,
        "dfsId": 0,
        "sr": 48000,
        "name": "",
        "id": 12528896780,
        "size": 66119020,
        "extension": "flac"
    },
    "rtype": 0,
    "rurl": null,
    "position": 0,
    "duration": 307626,
    "alias": [],
    "status": 0,
    "name": "思念是一种病 (live)",
    "id": 2720029246,
    "videoInfo": {
        "moreThanOne": false,
        "video": null
    },
    "recommendReason": "相似歌曲",
    "privilege": {
        "id": 2720029246,
        "fee": 8,
        "payed": 0,
        "st": 0,
        "pl": 320000,
        "dl": 0,
        "sp": 7,
        "cp": 1,
        "subp": 1,
        "cs": false,
        "maxbr": 999000,
        "fl": 320000,
        "toast": false,
        "flag": 2068484,
        "preSell": false,
        "playMaxbr": 999000,
        "downloadMaxbr": 999000,
        "maxBrLevel": "sky",
        "playMaxBrLevel": "sky",
        "downloadMaxBrLevel": "sky",
        "plLevel": "exhigh",
        "dlLevel": "none",
        "flLevel": "exhigh",
        "rscl": null,
        "freeTrialPrivilege": {
            "resConsumable": false,
            "userConsumable": false,
            "listenType": null,
            "cannotListenReason": null,
            "playReason": null,
            "freeLimitTagType": null
        },
        "rightSource": 0,
        "chargeInfoList": [
            {
                "rate": 128000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 0
            },
            {
                "rate": 192000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 0
            },
            {
                "rate": 320000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 0
            },
            {
                "rate": 999000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
            },
            {
                "rate": 1999000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
            }
        ],
        "code": 0,
        "message": null,
        "plLevels": null,
        "dlLevels": null,
        "ignoreCache": null
    },
    "alg": "alg-music-rec-pp-sim_song-si-I2I"
}*/
export interface Song {
  id: number
  name: string
  artists: Artist[]
  album: Album
  duration: number // 歌曲时长，毫秒
  alias: string[] // 歌曲别名
  mvid?: number
}
