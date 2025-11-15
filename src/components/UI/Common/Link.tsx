import { ComponentProps } from 'react'

import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { Box, Styles } from '../Layout/Box'

interface LinkProps extends Styles, Omit<ComponentProps<'a'>, keyof Styles> {
  hoverUnderline?: boolean
}

export const Link = styled(Box)
  .withConfig({
    shouldForwardProp: (prop) => prop !== ('hoverUnderline' as string),
  })
  .attrs({ as: 'a' })<LinkProps>`
  color: ${({ color = '#333' }) => color};
  cursor: pointer;
  text-decoration: none;

  ${({ hoverUnderline = false }) =>
    hoverUnderline &&
    css`
      &:hover {
        text-decoration: underline;
      }
    `}
`

interface TextNavLinkProps
  extends Styles,
    Omit<ComponentProps<typeof NavLink>, keyof Styles> {}

export const TextNavLink = styled(Box).attrs({ as: NavLink })<TextNavLinkProps>`
  cursor: pointer;
  text-decoration: none;
  color: ${({ color = '#666' }) => color};
  display: inline-block;

  ${({ nowrap }) =>
    nowrap &&
    css`
      max-width: 100%;
      vertical-align: top;
    `}

  &:hover {
    text-decoration: underline;
  }
`
