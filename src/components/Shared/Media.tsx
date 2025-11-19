import styled from 'styled-components'

import { Sprite } from '../Core'

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

export const PlayButtonSM = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'playSmall',
  component: 'button',
  title: '播放',
})`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
`

export const PlayButtonSMLight = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'play',
  component: 'button',
  title: '播放',
})`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
`

export const PlayButtonXS = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playExtraSmall',
  component: 'button',
  title: '播放',
})`
  width: 11px;
  height: 11px;
  flex-shrink: 0;
`

/** AddTo */
export const AddToButtonSM = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'addTo',
  component: 'button',
  title: '添加到播放列表',
})`
  width: 17px;
  height: 17px;
  margin: 4px 0 0 2px;
  flex-shrink: 0;
`

export const AddToButtonXS = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'addToExtraSmall',
  component: 'button',
  title: '添加到播放列表',
})`
  width: 11px;
  height: 11px;
  flex-shrink: 0;
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
  flex-shrink: 0;
`

export const CollectButtonSM = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'collectSmall',
  component: 'button',
  title: '收藏',
})`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
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
  flex-shrink: 0;
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
  flex-shrink: 0;
`
