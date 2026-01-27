import styled from 'styled-components'

import { Sprite } from '../Core'

export const ExpandButtonWrapper = styled.div`
  margin-top: 5px;
  color: #0c73c2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const ExpandIcon = styled(Sprite).attrs<{ $expanded: boolean }>(
  (props) => ({
    sprite: 'icon',
    icon: props.$expanded ? 'expand' : 'collapse',
    component: 'span',
  })
)`
  display: inline-block;
  width: 11px;
  height: 8px;
`
