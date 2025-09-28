import styled, { css } from 'styled-components'

import { ContainerProps } from './Container'
import { Flex, FlexProps } from './Flex'

export const FlexContainer = styled(Flex)<ContainerProps & FlexProps>`
  ${({ variant = 'normal' }) =>
    variant === 'large' &&
    css`
      width: 1100px;
      margin: 0 auto;
    `}

  ${({ variant = 'normal' }) =>
    variant === 'normal' &&
    css`
      width: 982px;
      margin: 0 auto;
    `}
`
