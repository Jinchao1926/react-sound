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

export const SingleBadge = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'single',
  component: 'span',
  title: '单曲',
})`
  display: inline-block;
  width: 54px;
  height: 24px;
`
