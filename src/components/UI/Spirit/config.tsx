export interface SpriteConfig {
  url: string
  defaultSize?: string
  icons: Record<string, string | { position: string; size?: string }>
}

// Internal API
export type InternalSpriteConfig = Record<string, SpriteConfig>
export const INTERNAL_SPRITE_CONFIG: InternalSpriteConfig = {
  header: {
    url: require('./img/header.png'),
    icons: {
      logo: { position: '0 0' },
      redTriangle: { position: '-105px -70px', size: '120px auto' },
    },
  },
  footer: {
    url: './img/footer.png',
    icons: {
      home: { position: '0 -10px', size: '30px 30px' },
      search: { position: '-40px -10px' },
      user: '-80px -10px',
    },
  },
  button: {
    url: './img/button.png',
    icons: {
      play: { position: '-387px -103px' },
      pause: { position: '-420px -103px' },
      prev: { position: '-130px -204px' },
      next: { position: '-80px -204px' },
    },
  },
  button1: {
    url: './img/button1.png',
    icons: {
      more: { position: '0 -240px' },
      share: { position: '-120px -240px' },
      download: { position: '-240px -240px' },
    },
  },
  button2: {
    url: './img/button2.png',
    icons: {
      like: { position: '-51px -159px' },
      collect: { position: '-117px -159px' },
      comment: { position: '-180px -159px' },
    },
  },
  button3: {
    url: require('./img/button3.png'),
    icons: {
      circle: { position: '-225px -156px' },
      more: { position: '0 -240px' },
      arrowLeft: { position: '-260px -75px' },
      arrowRight: { position: '-300px -75px' },
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

// Public API
export type SpriteCategory = 'header' | 'footer' | 'button'
export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  button: INTERNAL_SPRITE_CONFIG.button, // Default to 'button' variant
}
