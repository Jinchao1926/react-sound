import styled, { css } from 'styled-components'

import { ContainerProps } from './Container'
import { Flex, FlexProps } from './Flex'

export const FlexContainer = styled(Flex)<ContainerProps & FlexProps>`
  ${({ variant = 'normal' }) => css`
    width: ${variant === 'large' ? '1100px' : '982px'};
    margin: 0 auto;
  `}
`
