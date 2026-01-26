import styled from 'styled-components'

import { Sprite, TextNavLink } from '@/components/Core'

export const Music = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'music',
  component: 'span',
})`
  display: inline-block;
  padding: 0;
  width: 36px;
  height: 29px;
  flex-shrink: 0;
`

export const NoDataText = styled.span`
  display: inline-block;
  color: #aaa;
  line-height: 43px;
`

export const NoDataLink = styled(TextNavLink)`
  text-decoration: underline !important;
`
