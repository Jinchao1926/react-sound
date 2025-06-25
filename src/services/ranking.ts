import { rsRequest } from '@/services'

/* 获取所有榜单
19723756: 云音乐飙升榜,
3779629：云音乐新歌榜,
2884035：云音乐原创榜,
*/
export function fetchTopList() {
  return rsRequest.get({
    url: '/toplist',
  })
}

// 获取榜单详情，榜单也是歌单的一种
export function fetchPlaylistDetail(id: number) {
  return rsRequest.get({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}
