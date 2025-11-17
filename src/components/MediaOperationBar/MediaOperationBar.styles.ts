import styled from 'styled-components'

import { Sprite } from '../UI'

export const SongOperationBarWrapper = styled.div`
  display: flex;
  align-items: center;

  /* button {
    height: 31px;
    padding: 0 5px 0 0;
    cursor: pointer;
  } */

  .play {
    width: 65px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-left: 28px;
    color: white;
    background-position: -5px -633px;
    &:hover {
      background-position: -5px -719px;
    }
  }
  .add {
    width: 31px;
    margin-right: 5px;
    background-position: 0 -1588px;
    &:hover {
      background-position: -40px -1588px;
    }
  }
`

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
