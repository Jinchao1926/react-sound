import styled from 'styled-components'

import { Image } from '../UI'
import { Sprite } from '../UI/Spirit'

interface CoverImageWrapperProps {
  width: number
  height: number
}

export const CoverImageWrapper = styled.div<CoverImageWrapperProps>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
`

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CoverOverlay = styled(Sprite)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-indent: -9999px;
  overflow: hidden;
`
