import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Sprite } from '@/components/Core'

export const RadioIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'radioIcon',
  component: 'span',
})`
  width: 16px;
  height: 17px;
`

export const RadioCategory = styled(NavLink)`
  display: inline-block;
  color: #cc0000;
  border: 1px solid #cc0000;
  padding: 0 6px;
  line-height: 16px;

  &:hover {
    background-color: #fbefee;
  }
`

export const RadioName = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 35px;
  margin-left: 10px;
  white-space: pre;
`

export const SubscribeButton = styled.button`
  margin-left: 10px;
  padding: 0 12px 0 10px;
  height: 28px;
  color: #333;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  &:hover {
    background-color: #f7f6f6;
  }
`

export const StarredIcon = styled(Sprite).attrs<{ $starred: boolean }>(
  (props) => ({
    sprite: 'icon',
    icon: props.$starred ? 'starred' : 'star',
    component: 'span',
  })
)`
  display: inline-block;
  width: 14px;
  height: 14px;
  transform: translateY(2px);
  margin-right: 4px;
`

export const PlayButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'playBlue2',
  component: 'button',
})`
  height: 31px;
  padding: 0 7px 0 36px;
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
