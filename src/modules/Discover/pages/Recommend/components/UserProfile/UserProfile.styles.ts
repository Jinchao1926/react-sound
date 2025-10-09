import styled from 'styled-components'

import { Sprite } from '@/components/UI'

export const UserProfileBG = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'greyBG',
})`
  height: 126px;
  text-align: center;
`

export const VipImage = styled.img`
  margin-top: 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export const LoginDesc = styled.p`
  width: 205px;
  margin: 0 auto;
  padding: 16px 0;
  line-height: 22px;
  text-align: left;
  color: #666;
`

export const LoginButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'loginButton',
  component: 'button',
})`
  width: 100px;
  height: 31px;
  color: #fff;
  text-shadow: 0 1px 0 #8a060b;
`
