import {
  forwardRef,
  type CSSProperties,
  type ElementType,
  type PropsWithChildren,
} from 'react'

import classNames from 'classnames'
import styled, { css } from 'styled-components'

import {
  type SpriteCategory,
  INTERNAL_SPRITE_CONFIG,
  SPRITE_VARIANTS,
  type SpriteConfig,
  type SpriteIconConfig,
} from './config'
import { Box, type Styles } from '../Layout/Box'

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
      repeat: null,
    }
  }

  return {
    normal: iconConfig.normal,
    hover: iconConfig.hover || null,
    size: iconConfig.size || null,
    repeat: iconConfig.repeat || null,
  }
}
interface StyledSpriteProps {
  $url: string
  $backgroundSize?: string
  $backgroundRepeat?: string
  $normalPosition: string
  $hoverPosition?: string | null
  $disable?: boolean
}

const StyledSprite = styled(Box)<StyledSpriteProps>`
  background-image: url(${({ $url }) => $url});
  background-repeat: ${({ $backgroundRepeat }) =>
    $backgroundRepeat || 'no-repeat'};
  background-position: ${({ $normalPosition, $disable }) =>
    $disable ? '0 9999px' : $normalPosition};

  ${({ $backgroundSize }) =>
    $backgroundSize &&
    $backgroundSize !== 'auto' &&
    css`
      background-size: ${$backgroundSize};
    `}

  ${({ $hoverPosition, $disable }) =>
    $hoverPosition &&
    !$disable &&
    css`
      &:hover,
      &.active {
        background-position: ${$hoverPosition};
      }
    `}
`

interface SpriteProps extends Styles {
  sprite: SpriteCategory
  icon: string
  component?: ElementType
  className?: string
  style?: CSSProperties
  disable?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Sprite = forwardRef<
  HTMLElement,
  PropsWithChildren<SpriteProps & any>
>(
  (
    {
      sprite,
      icon,
      component: Component = 'div',
      className,
      style,
      disable = false,
      children,
      ...props
    },
    ref
  ) => {
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
        ref={ref}
        as={Component}
        className={classNames(className)}
        style={style}
        $url={config.url}
        $backgroundSize={finalBackgroundSize}
        $backgroundRepeat={parsedConfig.repeat}
        $normalPosition={position}
        $hoverPosition={parsedConfig.hover}
        $disable={disable}
        {...props}
      >
        {children}
      </StyledSprite>
    )
  }
)

Sprite.displayName = 'Sprite'
