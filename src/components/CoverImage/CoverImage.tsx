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
  /** Whether to show border */
  bordered?: boolean
  /** Cover Sprite Category */
  coverSprite?: SpriteCategory
  /** Cover Sprite Icon */
  coverIcon?: string
  /** Cover Image Width, Defaults to `100%` */
  coverWidth?: number
  /** Cover Image Edge */
  coverEdge?: number
}

export const CoverImage: FC<PropsWithChildren<CoverImageProps>> = ({
  src,
  alt,
  to,
  size,
  bordered,
  coverSprite,
  coverIcon,
  coverWidth,
  coverEdge,
  children,
}) => {
  return (
    <CoverImageWrapper className="cover-image" size={size} bordered={bordered}>
      <StyledImage src={src} alt={alt} size={size} />
      {coverSprite && coverIcon ? (
        <CoverOverlay
          sprite={coverSprite}
          icon={coverIcon}
          component={to ? NavLink : Box}
          to={to}
          width={coverWidth}
          edge={coverEdge}
        />
      ) : to ? (
        <CoverNavLink to={to} />
      ) : null}
      {children}
    </CoverImageWrapper>
  )
}
