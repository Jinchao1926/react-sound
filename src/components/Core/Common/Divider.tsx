import { HTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  margin?: string | number
  size?: string | number
  color?: string
}

export const Divider = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['direction', 'margin', 'size', 'color'].includes(prop as string),
})<DividerProps>`
  border: none;
  ${({ direction = 'horizontal', margin = 8, size = 1, color = '#e5e7eb' }) =>
    direction === 'vertical'
      ? css`
          display: inline-block;
          height: 100%;
          width: ${typeof size === 'number' ? `${size}px` : size || '1em'};
          margin: 0 ${typeof margin === 'number' ? `${margin}px` : margin};
          background-color: ${color};
        `
      : css`
          width: 100%;
          height: ${typeof size === 'number' ? `${size}px` : size || '1em'};
          margin: ${typeof margin === 'number' ? `${margin}px` : margin} 0;
          background-color: ${color};
        `}
`
