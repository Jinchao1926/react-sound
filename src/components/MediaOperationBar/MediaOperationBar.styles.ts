import styled from 'styled-components'

import { Sprite } from '../UI'

export const PlayBlueButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'playBlue',
  component: 'button',
})`
  width: 66px;
  height: 31px;
  padding: 0 5px 0 22px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  color: white;
`

export const AddBlueButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'addBlue',
  component: 'button',
})`
  width: 31px;
  height: 31px;
  padding: 0;
  margin-right: 5px;
`
