// Icon configuration with optional hover state
export interface SpriteIconConfig {
  normal: string
  size?: string
  repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y' | 'space' | 'round'
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
  banner: {
    url: require('./img/banner.png'),
    icons: {
      dot: { normal: '3px -343px', hover: '-16px -343px' },
      left: { normal: '0 -360px' },
      right: { normal: '0 -508px' },
    },
  },
  downloadBG: {
    url: require('./img/download.png'),
    icons: {
      bg: { normal: '0 0' },
      button: { normal: '0 9999px', hover: '0 -290px' },
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
      new: '-67px -283px',
    },
  },
  icon4: {
    url: require('./img/icon4.png'),
    icons: {
      header: { normal: '0 0', repeat: 'repeat-x' },
      mv: '0 -151px',
      play: { normal: '0 -103px', hover: '0 -128px' },
      share: { normal: '0 -195px', hover: '-20px -195px' },
      download: { normal: '-81px -174px', hover: '-104px -174px' },
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
  icon: ['icon', 'icon2', 'icon3', 'icon4'],
}

// Public API - Export types for external use
export type SpriteCategory =
  | 'header'
  | 'footer'
  | 'banner'
  | 'downloadBG'
  | 'button'
  | 'icon'

export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  banner: INTERNAL_SPRITE_CONFIG.banner,
  downloadBG: INTERNAL_SPRITE_CONFIG.downloadBG,
  button: INTERNAL_SPRITE_CONFIG.button,
  icon: INTERNAL_SPRITE_CONFIG.icon,
}
