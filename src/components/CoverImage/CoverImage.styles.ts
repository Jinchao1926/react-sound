import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Image } from '../Core'
import { Sprite } from '../Core/Spirit'

interface CoverImageProps {
  width: number
  height: number
}

export const CoverImageWrapper = styled.div<CoverImageProps>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  /* overflow: hidden; */
`

export const StyledImage = styled(Image)<CoverImageProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  object-fit: cover;
`

export const CoverOverlay = styled(Sprite)<{ width?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => (width !== undefined ? `${width}px` : '100%')};
  height: 100%;
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
