import { FC, PropsWithChildren } from 'react'

import { NavLink } from 'react-router-dom'

import {
  CoverImageWrapper,
  StyledImage,
  CoverOverlay,
  CoverNavLink,
} from './CoverImage.styles'
import { Box } from '../Core'
import { SpriteCategory } from '../Core/Spirit/config'

export interface CoverImageProps {
  /** Image Source */
  src: string
  /** Image Alt Text */
  alt?: string
  /** NavLink to */
  to?: string
  /** Image Width & Height */
  size: number
  /** Cover Sprite Category */
  coverSprite?: SpriteCategory
  /** Cover Sprite Icon */
  coverIcon?: string
  /** Cover Image Width, Defaults to `100%` */
  coverWidth?: number
}

export const CoverImage: FC<PropsWithChildren<CoverImageProps>> = ({
  src,
  alt,
  to,
  size,
  coverSprite,
  coverIcon,
  coverWidth,
  children,
}) => {
  return (
    <CoverImageWrapper className="cover-image" width={size} height={size}>
      <StyledImage src={src} alt={alt} width={size} height={size} />
      {coverSprite && coverIcon ? (
        <CoverOverlay
          sprite={coverSprite}
          icon={coverIcon}
          component={to ? NavLink : Box}
          to={to}
          width={coverWidth}
        />
      ) : to ? (
        <CoverNavLink to={to} />
      ) : null}
      {children}
    </CoverImageWrapper>
  )
}
