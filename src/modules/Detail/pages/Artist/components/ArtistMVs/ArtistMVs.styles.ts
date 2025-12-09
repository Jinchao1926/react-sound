import styled from 'styled-components'

import { Sprite } from '@/components/Core/Spirit/Sprite'

export const MVItem = styled.div`
  width: 137px;
  margin-bottom: 30px;
  flex-basis: 25%;
`

export const PlayButton = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playMV',
  component: 'button',
  title: '播放',
})`
  position: absolute;
  top: 30px;
  left: 46.5px;
  width: 44px;
  height: 44px;
`
