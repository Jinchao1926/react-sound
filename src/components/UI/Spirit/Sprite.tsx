import React, { CSSProperties, ElementType, FC, PropsWithChildren } from 'react'

import classNames from 'classnames'

import {
  SpriteCategory,
  INTERNAL_SPRITE_CONFIG,
  SPRITE_VARIANTS,
  SpriteConfig,
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

  // Handle icon configuration (supports both string and object formats)
  const position =
    typeof iconConfig === 'string' ? iconConfig : iconConfig.position
  const iconSize = typeof iconConfig === 'object' ? iconConfig.size : null
  const finalBackgroundSize = iconSize || config.defaultSize

  // Build optimized sprite style object - only set non-default values
  const spriteStyle: CSSProperties = {
    backgroundImage: `url(${config.url})`,
    backgroundRepeat: 'no-repeat',
    // When disabled, use 9999px trick to hide the image
    backgroundPosition: disable ? '0 9999px' : position,
  }

  // Only set backgroundSize if it's not the default 'auto' or empty
  if (finalBackgroundSize && finalBackgroundSize !== 'auto') {
    spriteStyle.backgroundSize = finalBackgroundSize
  }

  return (
    <Component
      className={classNames(className)}
      style={{ ...spriteStyle, ...style }}
      {...props}
    >
      {children}
    </Component>
  )
}
