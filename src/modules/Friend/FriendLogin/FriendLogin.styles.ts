import styled from 'styled-components'

import { Sprite } from '@/components/UI/Spirit/Sprite'

export const LoginBG = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'discoverBG',
  component: 'div',
})`
  width: 902px;
  height: 414px;
  margin: 0 auto 0;
  padding-top: 70px;
`

export const LoginButton = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'discoverLogin',
  component: 'button',
})`
  width: 157px;
  height: 48px;
  margin: 36px 0 0 535px;
`

export const LoginTips = styled.div`
  padding: 178px 0 0 535px;
  line-height: 23px;
  font-size: 14px;
  color: #666;
`
