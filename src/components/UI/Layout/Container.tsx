import styled, { css } from 'styled-components'

import { Box } from './Box'

export interface ContainerProps {
  variant?: 'large' | 'normal'
}

export const Container = styled(Box)<ContainerProps>`
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
