import { NavLink } from 'react-router'
import styled from 'styled-components'

import { Image } from '../Core'
import { Sprite } from '../Core/Spirit'

interface CoverImageProps {
  size: { width: number; height: number }
  bordered?: boolean
}

export const CoverImageWrapper = styled.div<CoverImageProps>`
  position: relative;
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
  flex-shrink: 0;
  /* overflow: hidden; */

  ${({ bordered }) =>
    bordered &&
    `
      padding: 4px;
      border: 1px solid #ccc;
    `}
`

export const StyledImage = styled(Image)<{
  size: { width: number; height: number }
}>`
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
  object-fit: cover;
`

interface CoverOverlayProps {
  width?: number
  edge?: number
}
export const CoverOverlay = styled(Sprite)<CoverOverlayProps>`
  position: absolute;
  top: ${({ edge }) => (edge !== undefined ? `${edge}px` : '0')};
  left: ${({ edge }) => (edge !== undefined ? `${edge}px` : '0')};
  width: ${({ width, edge }) =>
    width !== undefined
      ? `${width}px`
      : edge !== undefined
        ? `calc(100% - ${edge * 2}px)`
        : '100%'};
  height: ${({ edge }) =>
    edge !== undefined ? `calc(100% - ${edge * 2}px)` : '100%'};
  text-indent: -9999px;
  overflow: hidden;
`

export const CoverNavLink = styled(NavLink)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-indent: -9999px;
  overflow: hidden;
`
