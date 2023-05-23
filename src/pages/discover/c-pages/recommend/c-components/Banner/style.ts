import styled from "styled-components";

interface BannerProps {
  bgImage?: string
}

export const BannerWrapper = styled.div<BannerProps>`
  background: url(${ props => props.bgImage });
  background-size: 6000px;
  background-position: center;

  .banner {
    display: flex;
    position: relative;
    height: 285px;
  }
`

export const BannerLeft = styled.div`
  /* position: relative; */
  width: 730px;

  .banner-item {
    height: 285px;
    overflow: hidden;
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .dots {
    position: absolute;
    bottom: 5px;
    width: 730px;
    display: flex;
    justify-content: center;

    > li {
      margin: 0 2px;
  
      .item {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(${require('@/assets/img/banner_sprite.png')});
        background-position: 3px -343px;
        cursor: pointer;

        &:hover, &.active {
          background-position: -16px -343px;
        }
      }
    }
  }
`

export const BannerRight = styled.a.attrs({
  href: 'https://music.163.com/#/download',
  target: '_blank' // 会导致页面跳转
})`
  background: url(${require('@/assets/img/download.png')});
  position: absolute;
  top: 0;
  right: -1px;
  width: 254px;
  height: 285px;
  /* z-index: 20; */

  p {
    position: absolute;
    bottom: 8px;
    left: 0;
    right: 0;
    margin: 10px auto;
    text-align: center;
    color: #8d8d8d;
  }
`

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -31px;

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require('@/assets/img/banner_sprite.png')});
    background-color: transparent;
    // 光标变为手形，一般用于提示可点击
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, .2);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`