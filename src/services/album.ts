import { rsRequest } from '@/services'

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
// 最新专辑
export function fetchTopAlbums() {
  return rsRequest.get({
    url: '/album/newest',
  })
}

// 全部新碟
export function fetchAlbums(
  area: string,
  offset: number = 0,
  limit: number = 10
) {
  return rsRequest.get({
    url: '/album/new',
    params: {
      area,
      offset,
      limit,
    },
  })
}
