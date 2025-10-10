import styled from 'styled-components'

import { Sprite } from '../UI'

export const MVLogo = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'mv',
  component: 'span',
  title: '播放MV',
})`
  display: inline-block;
  width: 23px;
  height: 17px;
`
