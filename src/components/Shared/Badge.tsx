import styled from 'styled-components'

import { Sprite } from '../Core'

export const MVBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'mv',
  component: 'span',
  title: '播放MV',
})`
  display: inline-block;
  width: 23px;
  height: 17px;
`

export const SongBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'song',
  component: 'span',
  title: '单曲',
})`
  display: inline-block;
  width: 54px;
  height: 24px;
  flex-shrink: 0;
`

export const PlaylistBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playlist',
  component: 'span',
  title: '歌单',
})`
  display: inline-block;
  width: 54px;
  height: 24px;
  flex-shrink: 0;
`
