import styled, { css } from 'styled-components'

import { Box } from './Box'

export interface ContainerProps {
  variant?: 'large' | 'normal'
}

export const Container = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== ('variant' as string),
})<ContainerProps>`
  ${({ variant = 'normal' }) => css`
    width: ${variant === 'large' ? '1100px' : '982px'};
    margin: 0 auto;
  `}
`
