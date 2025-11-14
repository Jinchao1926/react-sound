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
  // Platform Download
  platformDownload: {
    url: require('./img/download.png'),
    icons: {
      iOS: { normal: '0 -392px', hover: '0 -472px' },
      pc: { normal: '-70.5px -392px', hover: '-70.5px -472px' },
      android: { normal: '-159px -392px', hover: '-159px -472px' },
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
  icon: {
    url: require('./img/icon.png'),
    icons: {
      progressDot: { normal: '0 -250px', hover: '0 -280px' },
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
  icon3: {
    url: require('./img/icon3.png'),
    icons: {
      info: { normal: '0 -50px', hover: '-20px -50px' },
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
      ranking: '0 -240px',
      rankingProgress: '0 -304px',
    },
  },
  police: {
    url: require('./img/icon/police.png'),
    icons: {
      police: { normal: '0 0', size: '14px 14px' },
    },
  },
  file: {
    url: require('./img/icon/file.png'),
    icons: {
      file: { normal: '0 0', size: '20px 20px' },
    },
  },
  // Player Bar
  playbar: {
    url: require('./img/playbar.png'),
    icons: {
      // Lock
      lockBar: '0 -380px',
      locked: { normal: '-100px -380px', hover: '-100px -400px' },
      unlocked: { normal: '-80px -380px', hover: '-80px -400px' },
      // Bar
      bar: { normal: '0 0', repeat: 'repeat-x' },
      cover: '0 -80px',
      // Play
      pause: { normal: '0 -165px', hover: '-40px -165px' },
      play: { normal: '0 -204px', hover: '-40px -204px' },
      prev: { normal: '0 -130px', hover: '-30px -130px' },
      next: { normal: '-80px -130px', hover: '-110px -130px' },
      // Play Operation
      collect: { normal: '-88px -163px', hover: '-88px -189px' },
      share: { normal: '-114px -163px', hover: '-114px -189px' },
      // Play Controls
      playControl: '-147px -238px',
      volume: { normal: '-2px -248px', hover: '-31px -248px' },
      loop: { normal: '-3px -344px', hover: '-33px -344px' },
      random: { normal: '-66px -248px', hover: '-93px -248px' },
      singleLoop: { normal: '-66px -344px', hover: '-93px -344px' },
      playlist: { normal: '-42px -68px', hover: '-42px -98px' },
    },
  },
  pip: {
    url: require('./img/icon/pip.png'),
    icons: {
      pip: { normal: '0 0', hover: '0 -25px' },
    },
  },
  // Progress Bar
  progress: {
    url: require('./img/progress.png'),
    icons: {
      full: { normal: 'right 0' },
      loaded: { normal: 'right -30px' },
      cur: { normal: 'left -66px' },
    },
  },
  // Radio
  radio: {
    url: require('./img/radio_slider.png'),
    icons: {
      arrowLeft: '0 -30px',
      arrowRight: '-30px -30px',
    },
  },
  // Covers
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
  icon: ['icon', 'icon2', 'icon3', 'icon4', 'police', 'file'],
  playbar: ['playbar', 'pip'],
}

// Public API - Export types for external use
export type SpriteCategory =
  | 'header'
  | 'footer'
  | 'banner'
  | 'background'
  | 'button'
  | 'icon'
  | 'playbar'
  | 'progress'

export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  banner: INTERNAL_SPRITE_CONFIG.banner,
  background: INTERNAL_SPRITE_CONFIG.downloadBG,
  button: INTERNAL_SPRITE_CONFIG.button,
  icon: INTERNAL_SPRITE_CONFIG.icon,
  playbar: INTERNAL_SPRITE_CONFIG.playbar,
  progress: INTERNAL_SPRITE_CONFIG.progress,
}
