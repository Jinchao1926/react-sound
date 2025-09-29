import { AnchorHTMLAttributes } from 'react'

import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  hoverUnderline?: boolean
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

export const TextNavLink = styled(NavLink)`
  color: #666;
  &:hover {
    text-decoration: underline;
  }
`
