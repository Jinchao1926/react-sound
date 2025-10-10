// Icon configuration with optional hover state
export interface SpriteIconConfig {
  normal: string
  size?: string
  hover?: string
}

export interface SpriteConfig {
  url: string
  defaultSize?: string
  icons: Record<string, string | SpriteIconConfig>
}

// Internal API
export type InternalSpriteConfig = Record<string, SpriteConfig>
export const INTERNAL_SPRITE_CONFIG: InternalSpriteConfig = {
  header: {
    url: require('./img/header.png'),
    icons: {
      logo: '0 0',
      redTriangle: { normal: '-105px -70px', size: '120px auto' },
    },
  },
  footer: {
    url: './img/footer.png',
    icons: {
      home: { normal: '0 -10px', size: '30px 30px' },
      search: { normal: '-40px -10px' },
      user: { normal: '-80px -10px' },
    },
  },
  button: {
    url: './img/button.png',
    icons: {},
  },
  button1: {
    url: './img/button1.png',
    icons: {},
  },
  button2: {
    url: './img/button2.png',
    icons: {},
  },
  button3: {
    url: require('./img/button3.png'),
    icons: {
      greyBG: '0 0',
      loginButton: { normal: '0 -195px', hover: '-110px -195px' },
      more: '0 -240px',
      redCircle: '-225px -156px',
      arrowLeft: '-260px -75px',
      arrowRight: '-300px -75px',
      play: { normal: '-267px -205px', hover: '-267px -235px' },
      collect: { normal: '-300px -205px', hover: '-300px -235px' },
      playSmall: { normal: '-267px -268px', hover: '-267px -288px' },
      collectSmall: { normal: '-297px -268px', hover: '-297px -288px' },
    },
  },
  icon2: {
    url: require('./img/icon2.png'),
    icons: {
      addTo: { normal: '0 -700px', hover: '-22px -700px' },
      clock: '-18px -682px',
    },
  },
  cover: {
    url: require('./img/cover.png'),
    icons: {
      bright80: '-145px -57px',
      bright150: '-230px -380px',
    },
  },
}

// Variant group configuration
export const SPRITE_VARIANTS: Record<string, string[]> = {
  button: ['button', 'button2', 'button3'],
  icon: ['icon', 'icon2', 'icon3'],
}

// Public API - Export types for external use
export type SpriteCategory = 'header' | 'footer' | 'button'

export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  button: INTERNAL_SPRITE_CONFIG.button, // Default to 'button' variant
}
