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
  // Footers
  footer: {
    url: require('./img/footer.png'),
    defaultSize: '220px 220px',
    icons: {
      openPlatform: { normal: '-170px -5px', hover: '-5px -115px' },
      trade: { normal: '-5px -170px', hover: '-60px -170px' },
      amped: { normal: '-5px -60px', hover: '-60px -5px' },
      auth: { normal: '-60px -60px', hover: '-115px -5px' },
      musician: { normal: '-115px -115px', hover: '-5px -5px' },
      reward: { normal: '-170px -115px', hover: '-60px -115px' },
      cash: { normal: '-170px -60px', hover: '-115px -60px' },
    },
  },
  footer2: {
    url: require('./img/footer2.png'),
    defaultSize: '270px 45px',
    icons: {
      aiLogo: { normal: '0 0', hover: '-45px 0' },
      cloudSong: { normal: '-90px 0', hover: '-135px 0' },
      xStudio: { normal: '-180px 0', hover: '-225px 0' },
    },
  },
  police: {
    url: require('./img/icon/police.png'),
    icons: {
      police: { normal: '0 0', size: '14px 14px' },
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
  // Backgrounds
  downloadBG: {
    url: require('./img/download_bg.png'),
    icons: {
      downloadBG: { normal: '0 0' },
      download: { normal: '0 9999px', hover: '0 -290px' },
    },
  },
  loginBG: {
    url: require('./img/login_bg.png'),
    icons: {
      mineBG: { normal: '0 104px' },
      mineLogin: { normal: '0 9999px', hover: '0 -278px' },
    },
  },
  loginBG2: {
    url: require('./img/login_bg2.png'),
    icons: {
      discoverBG: { normal: '0 70px' },
      discoverLogin: { normal: '0 9999px', hover: '0 -430px' },
    },
  },
  // Buttons
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
  // Icons
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
  footer: ['footer', 'footer2'],
  background: ['downloadBG', 'loginBG', 'loginBG2'],
  button: ['button', 'button2', 'button3'],
  icon: ['icon', 'icon2', 'icon3', 'icon4', 'police'],
}

// Public API - Export types for external use
export type SpriteCategory =
  | 'header'
  | 'footer'
  | 'banner'
  | 'background'
  | 'button'
  | 'icon'

export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  banner: INTERNAL_SPRITE_CONFIG.banner,
  background: INTERNAL_SPRITE_CONFIG.downloadBG,
  button: INTERNAL_SPRITE_CONFIG.button,
  icon: INTERNAL_SPRITE_CONFIG.icon,
}
