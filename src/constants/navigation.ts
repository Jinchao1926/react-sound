export interface RootNavigation {
  key: string
  title: string
  type: 'path' | 'link'
  link: string
}

// Navigation Header
export const rootNavigations: RootNavigation[] = [
  {
    key: 'discover',
    title: '发现音乐',
    type: 'path',
    link: '/discover',
  },
  {
    key: 'mine',
    title: '我的音乐',
    type: 'path',
    link: '/mine',
  },
  {
    key: 'friend',
    title: '关注',
    type: 'path',
    link: '/friend',
  },
  {
    key: 'store',
    title: '商城',
    type: 'link',
    link: 'https://music.163.com/store/product',
  },
  {
    key: 'musician',
    title: '音乐人',
    type: 'link',
    link: 'https://music.163.com/nmusician/web/index#/',
  },
  {
    key: 'cloud',
    title: '云推歌',
    type: 'link',
    link: 'https://music.163.com/st/ad-song',
  },
  {
    key: 'download',
    title: '下载客户端',
    type: 'path',
    link: '/download',
  },
]

// Discover Header
export const discoverNavigations = [
  {
    title: '推荐',
    link: '/discover/recommend',
  },
  {
    title: '排行榜',
    link: '/discover/toplist',
  },
  {
    title: '歌单',
    link: '/discover/playlist',
  },
  {
    title: '播客',
    link: '/discover/djradio',
  },
  {
    title: '歌手',
    link: '/discover/artist',
  },
  {
    title: '新碟上架',
    link: '/discover/album',
  },
]

// Artist Header
export const artistNavigations = [
  {
    title: '热门作品',
    link: '/artist',
  },
  {
    title: '所有专辑',
    link: '/artist/album',
  },
  {
    title: '相关MV',
    link: '/artist/mv',
  },
  {
    title: '艺人介绍',
    link: '/artist/desc',
  },
]
