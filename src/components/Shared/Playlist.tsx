import styled from 'styled-components'

import { Sprite } from '../Core'

export const ShareButton = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'share',
  component: 'button',
  title: '分享',
})`
  display: inline-block;
  padding: 0;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`

export const CollectButton = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'collect',
  component: 'button',
  title: '收藏全部',
})`
  display: inline-block;
  padding: 0;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`

export const ClearButton = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'clear',
  component: 'button',
  title: '删除',
})`
  display: inline-block;
  padding: 0;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`

export const DownloadButton = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'download',
  component: 'button',
  title: '下载',
})`
  display: inline-block;
  padding: 0;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`

export const CloseButton = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'close',
  component: 'button',
  title: '关闭',
})`
  display: inline-block;
  padding: 0;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
`
