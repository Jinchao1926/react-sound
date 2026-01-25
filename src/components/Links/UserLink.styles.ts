import styled from 'styled-components'

import { Text } from '../Core'

interface UserLinksProps {
  $block?: boolean
}

export const UserLinks = styled(Text)<UserLinksProps>`
  display: ${({ $block }) => ($block ? 'block' : 'inline-block')};
  ${({ $block }) => $block && 'width: 100%;'}
  flex-shrink: 0;
`
