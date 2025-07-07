/** 电台 */
export interface Radio {
  id: number
  name: string
  picUrl: string
  programCount: number
  subCount: number
  dj: {
    userId: number
    nickname: string
    avatarDetail?: {
      identityIconUrl: string
    }
  }
}

/** 电台节目 */
export interface Program {
  id: number
  name: string
  coverUrl: string
  createTime: number
  duration: number
  listenerCount: number
  radio: Radio
}

/*
{
  "pic56x56Id": 109951165404091540,
  "pic96x96Id": 109951165404086270,
  "picPCWhite": 109951165404086290,
  "picPCBlack": 109951165404093580,
  "picWeb": 109951165406422560,
  "picIPad": 109951165404094510,
  "pic84x84Id": 109951165404092530,
  "pic56x56IdStr": "109951165404091541",
  "pic56x56Url": "https://p3.music.126.net/mk24oOQQKiUIr140fZbx5Q==/109951165404091541.jpg",
  "pic96x96IdStr": "109951165404086270",
  "pic96x96Url": "https://p4.music.126.net/ZcHIE0jRkdJpng82oW5YFA==/109951165404086270.jpg",
  "pic84x84IdUrl": "https://p4.music.126.net/7Qm5KCFbxCKKhaoQP__5EQ==/109951165404092535.jpg",
  "picPCWhiteStr": "109951165404086285",
  "picPCWhiteUrl": "https://p4.music.126.net/MtiYAilGXGeNgGBeFkgO3g==/109951165404086285.jpg",
  "picPCBlackStr": "109951165404093587",
  "picPCBlackUrl": "https://p4.music.126.net/I7ymGxYlegjAtusaAG2ACA==/109951165404093587.jpg",
  "picWebStr": "109951165406422565",
  "picWebUrl": "https://p4.music.126.net/icULXvfqWJMFvcjTrXSLeA==/109951165406422565.jpg",
  "picMacId": "109951165404092603",
  "picMacUrl": "https://p3.music.126.net/-4U8WbXI60U7XzqjecG09g==/109951165404092603.jpg",
  "picUWPId": "109951165404091156",
  "picUWPUrl": "https://p3.music.126.net/CYe8zN09HBrrBTWE9Qf4vA==/109951165404091156.jpg",
  "picIPadStr": "109951165404094515",
  "picIPadUrl": "https://p3.music.126.net/ZKRoJeha-OEcHhTgt_vMNw==/109951165404094515.jpg",
  "name": "情感",
  "id": 3
},*/
/** 播客分类 */
export interface PodcastCategory {
  id: number
  name: string
  picWebUrl: string
}
