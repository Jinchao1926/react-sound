import styled from 'styled-components'

import { Sprite } from '../Core'

export const PlayBlueButton2 = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'playBlue2',
  component: 'button',
})`
  height: 31px;
  padding: 0 7px 0 36px;
  border-radius: 4px;
  color: white;
`

export const StarButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'starBlue',
  component: 'button',
})`
  height: 31px;
  padding: 0 7px 0 30px;
  border-radius: 4px;
  color: white;
`

export const LikedIcon = styled(Sprite).attrs<{ $liked: boolean }>((props) => ({
  sprite: 'button',
  icon: props.$liked ? 'liked' : 'like',
  component: 'span',
}))`
  display: inline-block;
  width: 17px;
  height: 15px;
  transform: translateY(4px);
  margin-right: 6px;
`
