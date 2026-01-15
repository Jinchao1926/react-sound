import { type CSSProperties, type HTMLAttributes } from 'react'

import styled from 'styled-components'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical'
  margin?: string | number
  size?: string | number
  color?: string
}

const toPx = (value: string | number | undefined): string => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value || '1em'
}

export const Divider = styled.div
  .withConfig({
    shouldForwardProp: (prop) =>
      !['direction', 'margin', 'size', 'color'].includes(prop as string),
  })
  .attrs<DividerProps>((props) => {
    const {
      direction = 'horizontal',
      margin = 8,
      size = 1,
      color = '#e5e7eb',
    } = props

    const style: CSSProperties = {
      border: 'none',
      backgroundColor: color,
    }

    if (direction === 'vertical') {
      style.display = 'inline-block'
      style.height = '100%'
      style.width = toPx(size)
      style.margin = `0 ${toPx(margin)}`
    } else {
      style.width = '100%'
      style.height = toPx(size)
      style.margin = `${toPx(margin)} 0`
    }

    return { style }
  })<DividerProps>`
  border: none;
`
