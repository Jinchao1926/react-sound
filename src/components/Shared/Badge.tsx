import styled from 'styled-components'

import { Sprite } from '../Core'

export const PlayMV = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playMV',
  component: 'span',
  title: '播放MV',
})`
  display: inline-block;
  width: 23px;
  height: 17px;
  flex-shrink: 0;
  margin: 2px 0 0 2px;
`

export const PlayMVRed = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'mvRed',
  component: 'span',
  title: '播放MV',
})`
  display: inline-block;
  width: 21px;
  height: 18px;
  flex-shrink: 0;
`

export const MVBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'mv',
  component: 'span',
  title: 'MV',
})`
  display: inline-block;
  width: 29px;
  height: 18px;
  flex-shrink: 0;
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

export const SongVIPBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'badge',
  component: 'span',
  title: 'VIP单曲',
})`
  display: inline-flex;
  align-items: center;
  padding-left: 8px;
  width: 67px;
  height: 27px;
  color: #fff;
  font-size: 13px;
  flex-shrink: 0;

  &::after {
    content: 'VIP单曲';
  }
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

export const AlbumBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'album',
  component: 'span',
  title: '专辑',
})`
  display: inline-block;
  width: 54px;
  height: 24px;
  flex-shrink: 0;
`

export const RadioBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'radio',
  component: 'span',
  title: '电台',
})`
  display: inline-block;
  width: 55px;
  height: 24px;
  flex-shrink: 0;
`

export const ProgramBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'program',
  component: 'span',
  title: '播客节目',
})`
  display: inline-block;
  width: 73px;
  height: 24px;
  flex-shrink: 0;
`
