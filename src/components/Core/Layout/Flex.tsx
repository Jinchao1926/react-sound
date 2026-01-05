import { type CSSProperties, type HTMLAttributes } from 'react'

import styled from 'styled-components'

import { Box } from './Box'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  wrap?: CSSProperties['flexWrap'] | boolean
  gap?: CSSProperties['gap'] | number
  flex?: CSSProperties['flex']
}

export const Flex = styled(Box).withConfig({
  shouldForwardProp: (prop) =>
    !['vertical', 'justify', 'align', 'wrap', 'gap', 'flex'].includes(
      prop as string
    ),
})<FlexProps>`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? 'column' : 'row')};
  ${(props) => props.justify && `justify-content: ${props.justify};`}
  ${(props) => props.align && `align-items: ${props.align};`}
  ${(props) =>
    props.wrap &&
    `flex-wrap: ${typeof props.wrap === 'boolean' ? 'wrap' : props.wrap};`}
  ${(props) =>
    props.gap !== undefined &&
    `gap: ${typeof props.gap === 'number' ? `${props.gap}px` : props.gap};`}
  ${(props) => props.flex && `flex: ${props.flex};`}
`
