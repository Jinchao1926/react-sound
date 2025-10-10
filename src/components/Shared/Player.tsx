import styled from 'styled-components'

import { Sprite } from '../UI'

/** Play */
export const PlayButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'play',
  component: 'button',
  title: '播放',
})`
  width: 22px;
  height: 22px;
`

export const PlayButtonSmall = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'playSmall',
  component: 'button',
  title: '播放',
})`
  width: 17px;
  height: 17px;
`

export const PlayButtonLight = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'play',
  component: 'button',
  title: '播放',
})`
  width: 17px;
  height: 17px;
`

/** AddTo */
export const AddToButtonSmall = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'addTo',
  component: 'button',
  title: '添加到播放列表',
})`
  width: 17px;
  height: 17px;
  margin: 4px 0 0 2px;
`

/** Collect */
export const CollectButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'collect',
  component: 'button',
  title: '收藏',
})`
  width: 22px;
  height: 22px;
`

export const CollectButtonSmall = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'collectSmall',
  component: 'button',
  title: '收藏',
})`
  width: 17px;
  height: 17px;
`

/** Share */
export const ShareButton = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'share',
  component: 'button',
  title: '分享',
})`
  width: 17px;
  height: 17px;
  margin: 4px 0 0 2px;
`

/** Download */
export const DownloadButton = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'download',
  component: 'button',
  title: '下载',
})`
  width: 17px;
  height: 17px;
  margin: 2px 0 0 2px;
`
