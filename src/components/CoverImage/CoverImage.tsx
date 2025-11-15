import { FC, PropsWithChildren } from 'react'

import { NavLink } from 'react-router-dom'

import {
  CoverImageWrapper,
  StyledImage,
  CoverOverlay,
} from './CoverImage.styles'
import { SpriteCategory } from '../UI/Spirit/config'

export interface CoverImageProps {
  /** Image Source */
  src: string
  /** Image Alt Text */
  alt?: string
  /** NavLink to */
  to: string
  /** Image Width & Height */
  size: number
  /** Cover Sprite Category */
  coverSprite?: SpriteCategory
  /** Cover Sprite Icon */
  coverIcon?: string
}

export const CoverImage: FC<PropsWithChildren<CoverImageProps>> = ({
  src,
  alt,
  to,
  size,
  coverSprite,
  coverIcon,
  children,
}) => {
  return (
    <CoverImageWrapper width={size} height={size}>
      <StyledImage src={src} alt={alt} />
      <CoverOverlay
        sprite={coverSprite}
        icon={coverIcon}
        component={NavLink}
        to={to}
      />
      {children}
    </CoverImageWrapper>
  )
}
