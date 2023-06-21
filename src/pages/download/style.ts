import styled from "styled-components";

export const DownloadWrapper = styled.div`
  /* background: url(${require('@/assets/img/download/download_bg.png')}) repeat-x; */
  .content {
    display: flex;
    justify-content: space-between;
  }
`

export const DownloadContent = styled.div`
  background-color: #222;

  .content {
    display: flex;
    padding: 80px 0 84px;  
    text-align: center;
    position: relative;

    .other-clients {
      position: absolute;
      height: 60px;
      line-height: 60px;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;

      .icon {
        background: url(${require('@/assets/img/download/download_icon.png')});
        background-size: 20px;
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    .title {
      margin-bottom: 23px;
      font-size: 22px;
      opacity: 0.8;
      color: white;
      text-align: center;
    }
    .platform {
      width: 100%;
      height: 44px;
      margin: 20px auto;
      display: flex;
      justify-content: center;
    }
    .download {
      width: 300px;
      height: 65px;
      border-radius: 65px;
      background-color: #fff;
      color: #D10000;
      font-size: 22px;
      cursor: pointer;
      &:hover {
        background-color: #bababa;
      }
    }

    .pc {
      width: 556px;
      .icon {
        width: 464px;
        height: 273px;
      }

      .mac {
        background: url(${require('@/assets/img/download/mac.png')});
      }
      .windows {
        background: url(${require('@/assets/img/download/windows.png')});
        margin-left: 40px;
      }
      .mac, .windows {
        width: 154px;
        height: 44px;
        background-size: 154px 44px;
      }

      .win-download {
        padding-top: 12px;
        font-size: 14px;
        color: #fff;
        opacity: 0.6;
        .win64, .win32 {
          display: inline-block;
          color: #fff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    .mobile {
      width: 400px;
      margin-left: 220px;
      .icon {
        width: 246px;
        height: 273px;
      }

      .iOS {
        background: url(${require('@/assets/img/download/iOS.png')});
      }
      .android {
        background: url(${require('@/assets/img/download/android.png')});
        margin-left: 40px;
      }
      .iOS, .android {
        width: 120px;
        height: 44px;
        background-size: 120px 44px;
      }
    }
  }
`

export const DescriptionContent = styled.div`
  h3 {
    padding: 45px 0 5px;
    font-weight: normal;
    font-size: 40px;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    color: #666;
    em {
      color: #cc0000;
      font-style: normal;
    }
  }
`

export const MusicContent = styled.div`
  height: 437px;
  border-bottom: 1px solid #e3e3e3;
  background: white;
  
  .content {
    padding-top: 120px;

    .music-left {
      margin-left: 30px;
    }
    .music-right {
      margin-right: 57px;
      background: url(${require('@/assets/img/download/music_cover.png')});
      width: 408px;
      height: 190px;
    }
  }
`

export const StarContent= styled.div`
  height: 437px;
  border-bottom: 1px solid #e3e3e3;

  .content {
    padding-top: 106px; 

    .star-left {
      margin-left: 30px;
      background: url(${require('@/assets/img/download/stars.png')});
      width: 447px;
      height: 272px;
    }
  }
`

export const SocialContent = styled.div`
  height: 437px;
  border-bottom: 1px solid #e3e3e3;
  background: white;
  
  .content {
    padding-top: 72px;

    .social-left {
      margin-left: 30px;
    }
    .social-right {
      background: url(${require('@/assets/img/download/social.png')});
      width: 463px;
      height: 289px;
    }
  }
`

export const CloudContent = styled.div`
  height: 437px;
  border-bottom: 1px solid #e3e3e3;

  .content {
    padding-top: 95px; 

    .cloud-left {
      margin-left: 30px;
      background: url(${require('@/assets/img/download/cloud.png')});
      width: 435px;
      height: 246px;
    }
  }
`

export const RecognizeContent = styled.div`
  height: 437px;
  border-bottom: 1px solid #e3e3e3;
  background: white;
  
  .content {
    padding-top: 53px;

    .recognize-left {
      margin-left: 30px;
      margin-top: 96px;
    }
    .recognize-right {
      background: url(${require('@/assets/img/download/recognize.png')});
      width: 359px;
      height: 355px;
    }
  }
`