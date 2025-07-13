export interface RootNavigation {
  title: string
  type: 'path' | 'link'
  link: string
}

// Navigation Header
export const rootNavigations: RootNavigation[] = [
  {
    title: '发现音乐',
    type: 'path',
    link: '/discover',
  },
  {
    title: '我的音乐',
    type: 'path',
    link: '/mine',
  },
  {
    title: '关注',
    type: 'path',
    link: '/friend',
  },
  {
    title: '商城',
    type: 'link',
    link: 'https://music.163.com/store/product',
  },
  {
    title: '音乐人',
    type: 'link',
    link: 'https://music.163.com/nmusician/web/index#/',
  },
  {
    title: '云推歌',
    type: 'link',
    link: 'https://music.163.com/st/ad-song',
  },
  {
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
    title: '博客',
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
