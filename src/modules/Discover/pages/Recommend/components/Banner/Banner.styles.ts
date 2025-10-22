import styled from 'styled-components'

import { Sprite } from '@/components/UI'

interface BannerProps {
  bgImage?: string
}

export const BannerBackground = styled.div<BannerProps>`
  background: url(${(props) => props.bgImage});
  background-size: 6000px;
  background-position: center;
`

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export const BannerDot = styled(Sprite).attrs({
  sprite: 'banner',
  icon: 'dot',
  component: 'button',
})`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 2px;
`

export const BannerControlContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -31px;
`

export const LeftControl = styled(Sprite).attrs({
  sprite: 'banner',
  icon: 'left',
  component: 'button',
})`
  position: absolute;
  left: -68px;
  width: 37px;
  height: 63px;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const RightControl = styled(Sprite).attrs({
  sprite: 'banner',
  icon: 'right',
  component: 'button',
})`
  position: absolute;
  right: -68px;
  width: 37px;
  height: 63px;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
