import { AnchorHTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  hoverUnderline?: boolean
  // 常用的几个快捷属性
  color?: string
  fontSize?: string
  margin?: string
  padding?: string
}

export const Link = styled.a<LinkProps>`
  color: ${({ color = '#333' }) => color};
  cursor: pointer;
  text-decoration: none;

  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ padding }) => padding && `padding: ${padding};`}

  ${({ hoverUnderline = false }) =>
    hoverUnderline &&
    css`
      &:hover {
        text-decoration: underline;
      }
    `}
`
