import styled from 'styled-components'

import { Text } from '../UI'

interface UserLinksProps {
  block?: boolean
}

export const UserLinks = styled(Text).withConfig({
  shouldForwardProp: (prop) => prop !== ('block' as string),
})<UserLinksProps>`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  ${({ block }) => block && 'width: 100%;'}
`
