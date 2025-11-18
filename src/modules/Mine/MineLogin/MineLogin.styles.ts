import styled from 'styled-components'

import { Sprite } from '@/components/Core/Spirit/Sprite'

export const LoginBG = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'mineBG',
  component: 'div',
})`
  width: 807px;
  height: 268px;
  margin: 0 auto;
  padding-top: 104px;
`
export const LoginButton = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'mineLogin',
  component: 'button',
})`
  width: 167px;
  height: 45px;
  margin: 202px 0 0 482px;
`
