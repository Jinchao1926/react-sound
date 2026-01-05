import styled from 'styled-components'

import { Sprite } from '@/components/Core'
import { PLAY_MODE, type PlayModeType } from '@/types/player'

export const Playbar = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'bar',
  component: 'div',
})`
  height: 53px;
  padding-top: 6px;
`

// Play
interface PlayButtonProps {
  isPlaying: boolean
}
export const PlayButton = styled(Sprite)
  .withConfig({
    shouldForwardProp: (prop) => prop !== ('isPlaying' as string),
  })
  .attrs<PlayButtonProps>(({ isPlaying }) => ({
    sprite: 'playbar',
    icon: isPlaying ? 'pause' : 'play',
    component: 'button',
  }))`
  width: 36px;
  height: 36px;
  margin: 0 8px;
`

export const PrevButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'prev',
  component: 'button',
})`
  width: 28px;
  height: 28px;
`

export const NextButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'next',
  component: 'button',
})`
  width: 28px;
  height: 28px;
`

// Play Operation
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

// Play Control -
// Volumn, Play Mode, Playlist Count
export const PlayControl = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'playControl',
  component: 'div',
})``

export const VolumeButton = styled(Sprite).attrs({
  sprite: 'playbar',
  icon: 'volume',
  component: 'button',
})`
  width: 22px;
  height: 22px;
`

export const PlayModeButton = styled(Sprite)
  .withConfig({
    shouldForwardProp: (prop) => prop !== ('playMode' as string),
  })
  .attrs<{
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
