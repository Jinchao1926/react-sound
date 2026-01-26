import styled from 'styled-components'

import { Flex } from '@/components/Core'

export const PlaylistText = styled.span`
  color: #ccc;
  font-size: 12px;
`

export const PlaylistButtonWrapper = styled(Flex)`
  gap: 4px;
  align-items: center;
  height: 15px;
  cursor: pointer;

  &:hover {
    ${PlaylistText} {
      text-decoration: underline;
    }
  }
`
