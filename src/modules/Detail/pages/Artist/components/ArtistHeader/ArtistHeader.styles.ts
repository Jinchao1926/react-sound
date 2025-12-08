import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Flex, Sprite } from '@/components/Core'

export const ArtistName = styled.h2`
  margin: 0;
  height: 34px;
  line-height: 24px;
  font-size: 24px;
  font-weight: 400;
`

export const ArtistAlias = styled.h3`
  margin: 0;
  height: 32px;
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #999;
`

export const ArtistCover = styled(Sprite).attrs({
  sprite: 'cover',
  icon: 'mask',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 300px;
`

export const Actions = styled(Flex)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  gap: 20px;
`

export const HomepageLink = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'homepage',
  component: NavLink,
})`
  width: 96px;
  height: 32px;
`

export const Favorite = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'favorite',
  component: 'button',
})`
  width: 76px;
  height: 32px;
`

export const ArtistNavigationBar = styled.div`
  background: url(${require('@/assets/img/tab.png')}) repeat-x 0 0;
  display: flex;
`

export const ArtistNavigationLink = styled(NavLink)`
  background: url(${require('@/assets/img/tab.png')}) no-repeat 0 9999px;
  display: block;
  width: 138px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  font-size: 14px;
  color: #333;

  background-position: 0 0;
  &:hover {
    background-position: 0 -45px;
  }
  &.active {
    background-position: 0 -90px;
  }
`
