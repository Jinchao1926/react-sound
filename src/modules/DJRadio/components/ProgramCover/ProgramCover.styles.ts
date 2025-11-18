import styled from 'styled-components'

import { Sprite } from '@/components/Core/Spirit'

export const ProgramCoverWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

export const PlayButton = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playInCover',
  component: 'button',
  title: '播放',
})`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 22px;
  height: 22px;
  display: none;

  &:hover .play {
    display: block;
  }
`
