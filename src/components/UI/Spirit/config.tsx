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
    icons: {
      play: {
        normal: '-387px -103px',
        hover: '-420px -103px', // hover shows pause icon
      },
      pause: {
        normal: '-420px -103px',
        hover: '-387px -103px', // hover shows play icon
      },
      prev: { normal: '-130px -204px' },
      next: { normal: '-80px -204px' },
    },
  },
  button1: {
    url: './img/button1.png',
    icons: {
      more: { normal: '0 -240px' },
      share: { normal: '-120px -240px' },
      download: { normal: '-240px -240px' },
    },
  },
  button2: {
    url: './img/button2.png',
    icons: {
      like: { normal: '-51px -159px' },
      collect: { normal: '-117px -159px' },
      comment: { normal: '-180px -159px' },
    },
  },
  button3: {
    url: require('./img/button3.png'),
    icons: {
      greyBG: '0 0',
      loginButton: { normal: '0 -195px', hover: '-110px -195px' },
      more: '0 -240px',
      redCircle: '-225px -156px',
      arrowLeft: { normal: '-260px -75px' },
      arrowRight: { normal: '-300px -75px' },
    },
  },
}

// Variant group configuration
export const SPRITE_VARIANTS: Record<string, string[]> = {
  button: ['button', 'button2', 'button3'],
  // Future variant types can be added here, for example:
  // icon: ['icon', 'icon1', 'icon2'],
  // player: ['player', 'player1'],
}

// Public API - Export types for external use
export type SpriteCategory = 'header' | 'footer' | 'button'

export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  button: INTERNAL_SPRITE_CONFIG.button, // Default to 'button' variant
}
