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
