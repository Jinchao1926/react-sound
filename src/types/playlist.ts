/*
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
/** 热门推荐歌单 */
export interface PopularPlaylist {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
}

/*
{
  "id": 19723756,
  "name": "飙升榜",
  "coverImgId": 109951170048506930,
  "coverImgUrl": "https://p1.music.126.net/rIi7Qzy2i2Y_1QD7cd0MYA==/109951170048506929.jpg",
  "coverImgId_str": "109951170048506929",
  "adType": 0,
  "userId": 1,
  "createTime": 1404115136883,
  "status": 0,
  "opRecommend": false,
  "highQuality": false,
  "newImported": false,
  "updateTime": 1751429634877,
  "trackCount": 100,
  "specialType": 10,
  "privacy": 0,
  "trackUpdateTime": 1751445766684,
  "commentThreadId": "A_PL_0_19723756",
  "playCount": 6265055744,
  "trackNumberUpdateTime": 1751429634807,
  "subscribedCount": 4156379,
  "cloudTrackCount": 0,
  "ordered": true,
  "description": "云音乐中每天热度上升最快的100首单曲，每日更新。",
  "tags": [],
  "updateFrequency": null,
  "backgroundCoverId": 0,
  "backgroundCoverUrl": null,
  "titleImage": 0,
  "titleImageUrl": null,
  "detailPageTitle": null,
  "englishTitle": null,
  "officialPlaylistType": null,
  "copied": false,
  "relateResType": null,
  "coverStatus": 3,
  "subscribed": null,
  "creator": {
    "defaultAvatar": false,
    "province": 110000,
    "authStatus": 1,
    "followed": false,
    "avatarUrl": "http://p1.music.126.net/kMuXXbwHbduHpLYDmHXrlA==/109951168152833223.jpg",
    "accountStatus": 0,
    "gender": 1,
    "city": 110101,
    "birthday": 0,
    "userId": 1,
    "userType": 2,
    "nickname": "网易云音乐",
    "signature": "网易云音乐是8亿人都在使用的音乐平台，致力于帮助音乐爱好者发现音乐惊喜，帮助音乐人实现梦想。 \n2019年8月31日起，将不再提供实时在线人工服务。您可以优先通过自助方式解决问题，如仍需求助，可在相关页面留下您的问题，后续会有人工为您解答，辛苦您耐心等待，给您带来的不便敬请谅解。 如果仍然不能解决您的问题，可以邮件我们： 用户：ncm5990@163.com 音乐人：yyr599@163.com",
    "description": "网易云音乐官方账号",
    "detailDescription": "网易云音乐官方账号",
    "avatarImgId": 109951168152833220,
    "backgroundImgId": 109951166515550960,
    "backgroundUrl": "http://p1.music.126.net/cwi82gitJJ0DfMO4cXbP8A==/109951166515550955.jpg",
    "authority": 3,
    "mutual": false,
    "expertTags": null,
    "experts": null,
    "djStatus": 10,
    "vipType": 11,
    "remarkName": null,
    "authenticationTypes": 4098,
    "avatarDetail": {
      "userType": 2,
      "identityLevel": 1,
      "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png"
    },
    "avatarImgIdStr": "109951168152833223",
    "anchor": true,
    "backgroundImgIdStr": "109951166515550955",
    "avatarImgId_str": "109951168152833223"
  },
  "videoIds": null,
  "videos": null,
  "bannedTrackIds": null,
  "mvResourceInfos": null,
  "shareCount": 16658,
  "commentCount": 225175,
  "remixVideo": null,
  "newDetailPageRemixVideo": null,
  "sharedUsers": null,
  "historySharedUsers": null,
  "gradeStatus": "NONE",
  "score": null,
  "algTags": null,
  "distributeTags": [],
  "trialMode": 32,
  "displayTags": null,
  "displayUserInfoAsTagOnly": false,
  "playlistType": "UGC",
  "bizExtInfo": {},
  "ToplistType": "S"
} */
/** 播放列表 */
export interface PlaylistDetail {
  id: number
  name: string
  coverImgId: number
  coverImgUrl: string
  createTime: number
  creator: {
    userId: number
    nickname: string
  }
  updateFrequency?: string | null
  updateTime: number
  trackUpdateTime: number
  trackNumberUpdateTime: number
  tracks: Track[]
  trackCount: number
  playCount: number
  shareCount: number
  commentCount: number
  subscribedCount: number
}

/*
{
  "name": "准备好就出发",
  "mainTitle": null,
  "additionalTitle": null,
  "id": 2718980895,
  "pst": 0,
  "t": 0,
  "ar": [
    {
      "id": 34862670,
      "name": "黄子弘凡",
      "tns": [],
      "alias": []
    }
  ],
  "alia": [],
  "pop": 100,
  "st": 0,
  "rt": "",
  "fee": 8,
  "v": 38,
  "crbt": null,
  "cf": "",
  "al": {
    "id": 276206869,
    "name": "准备好就出发",
    "picUrl": "http://p1.music.126.net/RMhbEK1UjCHwf_DIGJdKpA==/109951171388214602.jpg",
    "tns": [],
    "pic_str": "109951171388214602",
    "pic": 109951171388214610
  },
  "dt": 185454,
  "h": {
    "br": 320000,
    "fid": 0,
    "size": 7420845,
    "vd": -58611
  },
  "m": {
    "br": 192000,
    "fid": 0,
    "size": 4452525,
    "vd": -56062
  },
  "l": {
    "br": 128000,
    "fid": 0,
    "size": 2968365,
    "vd": -54410
  },
  "sq": {
    "br": 1012137,
    "fid": 0,
    "size": 23466610,
    "vd": -58598
  },
  "hr": {
    "br": 1781842,
    "fid": 0,
    "size": 41309771,
    "vd": -58598
  },
  "a": null,
  "cd": "01",
  "no": 1,
  "rtUrl": null,
  "ftype": 0,
  "rtUrls": [],
  "djId": 0,
  "copyright": 0,
  "s_id": 0,
  "mark": 17716748288,
  "originCoverType": 0,
  "originSongSimpleData": null,
  "tagPicList": null,
  "resourceState": true,
  "version": 4,
  "songJumpInfo": null,
  "entertainmentTags": null,
  "awardTags": null,
  "displayTags": null,
  "single": 0,
  "noCopyrightRcmd": null,
  "alg": null,
  "displayReason": null,
  "rtype": 0,
  "rurl": null,
  "mst": 9,
  "cp": 0,
  "mv": 0,
  "publishTime": 0,
  "videoInfo": {
    "moreThanOne": false,
    "video": null
  }
} */
/** 曲目 */
export interface Track {
  id: number
  name: string
  dt: number
  // 歌手信息
  ar: {
    id: number
    name: string
    tns: string[]
    alias: string[]
  }[]
  // 专辑信息
  al: {
    id: number
    name: string
    picUrl: string
    tns: string[]
    alias: string[]
  }
  // Track Name Supplement - 曲目名称补充
  tns?: string[]
  alia: string[]
  mv: number
}
