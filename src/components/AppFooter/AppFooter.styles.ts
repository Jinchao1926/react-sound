import styled from 'styled-components'

import { Flex, Sprite } from '../Core'

export const AppFooterWrapper = styled.div`
  height: 325px;
  border-top: 1px solid #d3d3d3;
  background-color: #f2f2f2;
  font-size: 12px;
`

export const FooterLink = styled(Sprite).attrs({
  sprite: 'footer',
  component: 'a',
})`
  display: block;
  width: 45px;
  height: 45px;
  margin: 0 auto;
`

export const FooterLinkText = styled.span`
  display: inline-block;
  width: 100px;
  margin-top: 10px;
  text-align: center;
  color: rgb(0, 0, 0, 0.5);
`

export const FooterCopyrights = styled(Flex)`
  justify-content: center;
  line-height: 24px;
`

export const FooterCopyrightDivider = styled.span`
  margin: 0 10px;
  color: #d9d9d9;
`

export const CopyrightIcon = styled(Sprite).attrs({
  sprite: 'icon',
  component: 'span',
})`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 2px;
  vertical-align: -2px;
`
