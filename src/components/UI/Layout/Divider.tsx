import { HTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  margin?: string | number
  width?: string | number
  color?: string
  dashed?: boolean
}

export const Divider = styled.div<DividerProps>`
  border: none;
  ${({
    direction = 'horizontal',
    margin = 8,
    width,
    color = '#e5e7eb',
    dashed,
  }) =>
    direction === 'vertical'
      ? css`
          display: inline-block;
          width: 0;
          height: ${typeof width === 'number' ? `${width}px` : width || '1em'};
          margin: 0 ${typeof margin === 'number' ? `${margin}px` : margin};
          border-left: ${dashed ? '1px dashed' : '1px solid'} ${color};
          vertical-align: middle;
        `
      : css`
          display: block;
          height: 0;
          width: 100%;
          margin: ${typeof margin === 'number' ? `${margin}px` : margin} 0;
          border-top: ${dashed ? '1px dashed' : '1px solid'} ${color};
        `}
`
