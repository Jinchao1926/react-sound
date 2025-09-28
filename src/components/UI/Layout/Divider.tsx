import { HTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  margin?: string | number
  size?: string | number
  color?: string
  dashed?: boolean
}

export const Divider = styled.div<DividerProps>`
  border: none;
  ${({
    direction = 'horizontal',
    margin = 8,
    size = 1,
    color = '#e5e7eb',
    dashed = false,
  }) =>
    direction === 'vertical'
      ? css`
          display: inline-block;
          height: 100%;
          width: ${typeof size === 'number' ? `${size}px` : size || '1em'};
          margin: 0 ${typeof margin === 'number' ? `${margin}px` : margin};
          border-left: ${dashed ? '1px dashed' : '1px solid'} ${color};
          vertical-align: middle;
        `
      : css`
          display: block;
          width: 100%;
          height: ${typeof size === 'number' ? `${size}px` : size || '1em'};
          margin: ${typeof margin === 'number' ? `${margin}px` : margin} 0;
          border-top: ${dashed ? '1px dashed' : '1px solid'} ${color};
        `}
`
