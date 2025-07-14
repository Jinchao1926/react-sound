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
