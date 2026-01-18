import bannerImg from './img/banner.png'
import buttonImg from './img/button.webp'
import button2Img from './img/button2.png'
import button3Img from './img/button3.png'
import categoryBgImg from './img/category_bg.png'
import coverImg from './img/cover.webp'
import coverMaskImg from './img/cover_mask.png'
import platformDownloadImg from './img/download.png'
import downloadBgImg from './img/download_bg.webp'
import footerImg from './img/footer.webp'
import footer2Img from './img/footer2.webp'
import headerImg from './img/header.png'
import badgeIcon from './img/icon/badge.png'
import fileImg from './img/icon/file.png'
import pipImg from './img/icon/pip.png'
import playRedImg from './img/icon/play_red.png'
import policeImg from './img/icon/police.png'
import wikiImg from './img/icon/wiki.png'
import iconImg from './img/icon.png'
import icon2Img from './img/icon2.png'
import icon3Img from './img/icon3.png'
import icon4Img from './img/icon4.png'
import icon5Img from './img/icon5.png'
import loginBgImg from './img/login_bg.webp'
import loginBg2Img from './img/login_bg2.webp'
import logoImg from './img/logo.png'
import playbarImg from './img/playbar.png'
import progressImg from './img/progress.png'
import radioImg from './img/radio_slider.png'
import selectionImg from './img/selection.png'
import sortImg from './img/sort.png'

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
    url: headerImg,
    icons: {
      logo: '0 0',
      redTriangle: { normal: '-105px -70px', size: '120px auto' },
    },
  },
  // Footers
  footer: {
    url: footerImg,
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
    url: footer2Img,
    defaultSize: '270px 45px',
    icons: {
      aiLogo: { normal: '0 0', hover: '-45px 0' },
      cloudSong: { normal: '-90px 0', hover: '-135px 0' },
      xStudio: { normal: '-180px 0', hover: '-225px 0' },
    },
  },
  banner: {
    url: bannerImg,
    icons: {
      dot: { normal: '3px -343px', hover: '-16px -343px' },
      left: { normal: '0 -360px' },
      right: { normal: '0 -508px' },
    },
  },
  // Backgrounds
  downloadBG: {
    url: downloadBgImg,
    icons: {
      downloadBG: { normal: '0 0' },
      download: { normal: '0 9999px', hover: '0 -290px' },
    },
  },
  loginBG: {
    url: loginBgImg,
    icons: {
      mineBG: { normal: '0 104px' },
      mineLogin: { normal: '0 9999px', hover: '0 -278px' },
    },
  },
  loginBG2: {
    url: loginBg2Img,
    icons: {
      discoverBG: { normal: '0 70px' },
      discoverLogin: { normal: '0 9999px', hover: '0 -430px' },
    },
  },
  categoryBG: {
    url: categoryBgImg,
    icons: {
      header: '0 0',
      body: { normal: '-720px 0', repeat: 'repeat-y' },
      footer: '-1440px -12px',
    },
  },
  // Platform Download
  platformDownload: {
    url: platformDownloadImg,
    icons: {
      iOS: { normal: '0 -392px', hover: '0 -472px' },
      pc: { normal: '-70.5px -392px', hover: '-70.5px -472px' },
      android: { normal: '-159px -392px', hover: '-159px -472px' },
      qrCode: '0 -300px',
    },
  },
  // Buttons
  button: {
    url: buttonImg,
    icons: {
      greyRightBG: { normal: 'right -1020px', hover: 'right -1106px' },
      grey: { normal: '0 -59px', hover: '0 -141px' },
      // Media Operation Bar
      playBlue: { normal: '-5px -633px', hover: '-5px -719px' },
      playBlue2: { normal: '0 -633px', hover: '0 -719px' },
      addBlue: { normal: '0 -1588px', hover: '-40px -1588px' },
      starBlue: { normal: '0 -2125px', hover: '0 -2516px' },
      playGrey: { normal: '0 -2285px', hover: '0 -2680px' },
      collectGrey: { normal: '0 -977px', hover: '0 -1063px' },
      shareGrey: { normal: '0 -1225px', hover: '0 -1268px' },
      downloadGrey: { normal: '0 -2761px', hover: '0 -2805px' },
      commentGrey: { normal: '0 -1465px', hover: '0 -1508px' },

      // Others
      like: '0 -95px',
      liked: '-30px -95px',
    },
  },
  button2: {
    url: button2Img,
    icons: {
      redButton: '0 0',
      greyButton: '0 -64px',
    },
  },
  button3: {
    url: button3Img,
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
  playRed: {
    url: playRedImg,
    icons: {
      playRed: { normal: '0 0', size: 'auto 100%' },
      addRed: { normal: '-78px 0', size: 'auto 100%' },
    },
  },
  // Icons
  icon: {
    url: iconImg,
    icons: {
      arrow: '-48px 0',
      playInCover: '0 -85px',
      playInCoverLarge: '0 -140px',
      progressDot: { normal: '0 -250px', hover: '0 -280px' },
      headset: '0 -24px',
      playInPanel: { normal: '0 0', hover: '0 -60px' },
    },
  },
  icon2: {
    url: icon2Img,
    icons: {
      // playlist category
      language: '-20px -735px',
      style: '0 -60px',
      scene: '0 -88px',
      emotion: '0 -117px',
      theme: '0 -141px',
      // trend
      trendNew: '-67px -283px',
      trendKeep: '-74px -274px',
      trendUp: '-74px -304px',
      trendDown: '-74px -324px',
      //
      addTo: { normal: '0 -700px', hover: '-22px -700px' },
      clock: '-18px -682px',
      new: '-67px -283px',
      arrowDown: '-70px -543px',
      collapse: '-45px -520px',
      expand: '-65px -520px',
      music: '-34px -863px',
      people: '-50px -300px',
      user: '0 -740px',
      // badges
      song: '0 -463px', // 单曲
      playlist: '0 -243px', // 歌单
      album: '0 -186px', // 专辑
      radio: '0 -1014px', // 电台
      mvRed: '0 -18px',
    },
  },
  icon3: {
    url: icon3Img,
    icons: {
      info: { normal: '0 -50px', hover: '-20px -50px' },
      playExtraSmall: '-69px -455px',
      addToExtraSmall: '-87px -454px',
      //
      radioIcon: '-50px -20px',
      star: '-50px 0',
      starred: '-70px 0',
      chevronUp: '-75px -29px',
      chevronDown: '-75px -20px',
      // badges
      program: '0 -75px', // 播客节目
      mv: '-230px -480px', // MV
    },
  },
  icon4: {
    url: icon4Img,
    icons: {
      header: { normal: '0 0', repeat: 'repeat-x' },
      playMV: '0 -151px',
      play: { normal: '0 -103px', hover: '0 -128px' },
      share: { normal: '0 -195px', hover: '-20px -195px' },
      download: { normal: '-81px -174px', hover: '-104px -174px' },
      ranking: '0 -240px',
      rankingProgress: '0 -304px',
    },
  },
  icon5: {
    url: icon5Img,
    icons: {
      homepage: { normal: '0 -1156px', hover: '0 -1196px' },
      favorite: { normal: '0px -500px', hover: '0 -540px' },
      playMV: { normal: '-30px -135px', hover: '-30px -85px' },
    },
  },
  badge: {
    url: badgeIcon,
    icons: {
      badge: { normal: '0 0', size: '100% 100%' },
    },
  },
  police: {
    url: policeImg,
    icons: {
      police: { normal: '0 0', size: '14px 14px' },
    },
  },
  file: {
    url: fileImg,
    icons: {
      file: { normal: '0 0', size: '20px 20px' },
    },
  },
  wiki: {
    url: wikiImg,
    icons: {
      wiki: { normal: '0 0', size: '20px 20px' },
    },
  },
  // Player Bar
  playbar: {
    url: playbarImg,
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
    url: pipImg,
    icons: {
      pip: { normal: '0 0', hover: '0 -25px' },
    },
  },
  // Progress Bar
  progress: {
    url: progressImg,
    icons: {
      full: { normal: 'right 0' },
      loaded: { normal: 'right -30px' },
      cur: { normal: 'left -66px' },
    },
  },
  // Radio
  radio: {
    url: radioImg,
    icons: {
      arrowLeft: '0 -30px',
      arrowRight: '-30px -30px',
    },
  },
  // Covers
  cover: {
    url: coverImg,
    icons: {
      // bright-width
      bright80: '-145px -57px',
      bright130: '0 -680px',
      bright140: '0 0',
      bright150: '-230px -380px',
      bright200: '0 -1285px',
      panel: '0 -537px',
      album: '0 -570px',
      albumMedium: '0 -845px',
      albumLarge: '-170px -850px',
      albumXLarge: '0 -986px',
      CD: '-140px -580px',
      MV: '0 -1170px',
    },
  },
  coverMask: {
    url: coverMaskImg,
    icons: {
      mask: '0 0',
    },
  },
  // Sort
  sort: {
    url: sortImg,
    icons: {
      desc: { normal: '0 0', hover: '0 -60px' },
      desced: { normal: '0 -30px' },
      asc: { normal: '-40px 0', hover: '-40px -60px' },
      asced: { normal: '-40px -30px' },
    },
  },
  // Selection
  selection: {
    url: selectionImg,
    icons: {
      normal: { normal: '0 -30px' },
      selected: { normal: '0 0' },
    },
  },
  // Logo
  logo: {
    url: logoImg,
    icons: {
      404: { normal: '0 -405px' },
    },
  },
}

// Variant group configuration
export const SPRITE_VARIANTS: Record<string, string[]> = {
  footer: ['footer', 'footer2'],
  background: ['downloadBG', 'loginBG', 'loginBG2', 'categoryBG'],
  button: ['button', 'button2', 'button3'],
  icon: [
    'icon',
    'icon2',
    'icon3',
    'icon4',
    'icon5',
    'badge',
    'police',
    'file',
    'wiki',
  ],
  playbar: ['playbar', 'pip'],
  cover: ['cover', 'coverMask'],
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
  | 'radio'
  | 'cover'
  | 'sort'
  | 'selection'
  | 'logo'

export const SPRITE_CONFIG: Record<SpriteCategory, SpriteConfig> = {
  header: INTERNAL_SPRITE_CONFIG.header,
  footer: INTERNAL_SPRITE_CONFIG.footer,
  banner: INTERNAL_SPRITE_CONFIG.banner,
  background: INTERNAL_SPRITE_CONFIG.downloadBG,
  button: INTERNAL_SPRITE_CONFIG.button,
  icon: INTERNAL_SPRITE_CONFIG.icon,
  playbar: INTERNAL_SPRITE_CONFIG.playbar,
  progress: INTERNAL_SPRITE_CONFIG.progress,
  radio: INTERNAL_SPRITE_CONFIG.radio,
  cover: INTERNAL_SPRITE_CONFIG.cover,
  sort: INTERNAL_SPRITE_CONFIG.sort,
  selection: INTERNAL_SPRITE_CONFIG.selection,
  logo: INTERNAL_SPRITE_CONFIG.logo,
}
