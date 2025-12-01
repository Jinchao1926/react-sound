import styled from 'styled-components'

import { Sprite } from '../Core'

export const MusicIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'music',
  component: 'span',
})`
  display: inline-block;
  width: 16px;
  height: 16px;
`

export const MusicLink = styled.a<{ underline?: boolean }>`
  color: #0c73c2;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};

  :hover {
    text-decoration: underline;
  }
`
