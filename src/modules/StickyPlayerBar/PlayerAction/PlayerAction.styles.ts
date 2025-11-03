import styled from 'styled-components'

import { Sprite } from '@/components/UI'
import { PLAY_MODE, PlayModeType } from '@/types/player'

export const PipButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'pip',
  component: 'button',
  title: '画中画歌词',
})`
  width: 22px;
  height: 22px;
`

export const CollectButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'collect',
  component: 'button',
  title: '收藏',
})`
  width: 22px;
  height: 22px;
`

export const ShareButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'share',
  component: 'button',
  title: '分享',
})`
  width: 22px;
  height: 22px;
`

export const Playbar = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'playbar',
  component: 'div',
})`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-left: 13px;
`

export const VolumeButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'volume',
  component: 'button',
})`
  width: 22px;
  height: 22px;
`

export const PlayModeButton = styled(Sprite).attrs<{
  playMode: PlayModeType
}>(({ playMode, onClick }) => ({
  sprite: 'playbar',
  icon:
    playMode === PLAY_MODE.SINGLE_LOOP
      ? 'singleLoop'
      : playMode === PLAY_MODE.RANDOM
        ? 'random'
        : 'loop',
  component: 'button',
  onClick,
  title:
    playMode === PLAY_MODE.SINGLE_LOOP
      ? '单曲循环'
      : playMode === PLAY_MODE.RANDOM
        ? '随机播放'
        : '循环',
}))`
  width: 22px;
  height: 22px;
`

export const PlaylistCountButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'playlist',
  component: 'button',
})`
  width: 59px;
  padding-left: 21px;
  line-height: 27px;
  text-align: center;
  color: #666;
`
