import React, { CSSProperties, ElementType, FC, PropsWithChildren } from 'react'

import classNames from 'classnames'
import styled, { css } from 'styled-components'

import {
  SpriteCategory,
  INTERNAL_SPRITE_CONFIG,
  SPRITE_VARIANTS,
  SpriteConfig,
  SpriteIconConfig,
} from './config'

interface SpriteProps {
  sprite: SpriteCategory
  icon: string
  component?: ElementType
  className?: string
  style?: CSSProperties
  disable?: boolean
}

// Search for sprite configuration
const findSpriteConfig = (
  sprite: string,
  icon: string
): SpriteConfig | null => {
  const variants = SPRITE_VARIANTS[sprite]
  if (!variants) {
    return INTERNAL_SPRITE_CONFIG[sprite] || null
  }

  // Has variants, search through all variants to find the config containing the icon
  for (const variant of variants) {
    const config = INTERNAL_SPRITE_CONFIG[variant]
    if (config && config.icons && config.icons[icon]) {
      return config
    }
  }

  return null
}

// Parse icon configuration and extract positions
const parseIconConfig = (iconConfig: string | SpriteIconConfig) => {
  if (typeof iconConfig === 'string') {
    return {
      normal: iconConfig,
      hover: null,
      size: null,
    }
  }

  return {
    normal: iconConfig.normal,
    hover: iconConfig.hover || null,
    size: iconConfig.size || null,
  }
}

const StyledSprite = styled.div<{
  url: string
  backgroundSize?: string
  normalPosition: string
  hoverPosition?: string | null
  disable?: boolean
}>`
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-position: ${({ normalPosition, disable }) =>
    disable ? '0 9999px' : normalPosition};

  ${({ backgroundSize }) =>
    backgroundSize &&
    backgroundSize !== 'auto' &&
    css`
      background-size: ${backgroundSize};
    `}

  ${({ hoverPosition, disable }) =>
    hoverPosition &&
    !disable &&
    css`
      &:hover {
        background-position: ${hoverPosition};
      }
    `}
`

export const Sprite: FC<PropsWithChildren<SpriteProps & any>> = ({
  sprite,
  icon,
  component: Component = 'div',
  className,
  style,
  disable = false,
  children,
  ...props
}) => {
  const config = findSpriteConfig(sprite, icon)
  if (!config) {
    // eslint-disable-next-line no-console
    console.warn(`Sprite "${sprite}" not found`)
    return null
  }

  const iconConfig = config.icons?.[icon]
  if (!iconConfig) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${icon}" in Sprite "${sprite}" not found`)
    return null
  }

  const parsedConfig = parseIconConfig(iconConfig)
  const finalBackgroundSize = parsedConfig.size || config.defaultSize
  const position = parsedConfig.normal || '0 0'

  return (
    <StyledSprite
      as={Component}
      className={classNames(className)}
      style={style}
      url={config.url}
      backgroundSize={finalBackgroundSize}
      normalPosition={position}
      hoverPosition={parsedConfig.hover}
      disable={disable}
      {...props}
    >
      {children}
    </StyledSprite>
  )
}
