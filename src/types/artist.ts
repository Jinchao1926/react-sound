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
  accountId?: number // user id
  name: string
  img1v1Url: string
  picUrl: string
  alias: string[]
  tns?: string[]
}

export interface ArtistIntroduction {
  briefDesc: string
  introduction: { ti: string; txt: string }[]
  // topicData: any
}
