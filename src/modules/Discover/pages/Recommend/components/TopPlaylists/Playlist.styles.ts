import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Sprite } from '@/components/UI'

export const PlaylistCover = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`

export const PlaylistLink = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

export const PlayButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'play',
  component: 'button',
})`
  width: 22px;
  height: 22px;
`

export const CollectButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'collect',
  component: 'button',
})`
  width: 22px;
  height: 22px;
`

export const PlaylistSongListWrapper = styled.div`
  .item {
    position: relative;
    display: flex;
    align-items: center;
    height: 32px;

    // 前三个高亮
    :nth-child(-n + 3) .index {
      color: #c10d0c;
    }

    .index {
      width: 35px;
      margin-left: 15px;
      font-size: 16px;
      color: #666;
      // 水平居中
      text-align: center;
    }
    .name {
      width: 170px;
      flex: 1;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }

    .actions {
      display: none;
      width: 82px;

      .btn {
        width: 17px;
        height: 17px;
        margin-left: 8px;
        cursor: pointer;
      }
      .play {
        background-position: -267px -268px;
        &:hover {
          background-position: -267px -288px;
        }
      }
      .addTo {
        margin-top: 2px;
        background-position: 0 -700px;
        &:hover {
          background-position: -22px -700px;
        }
      }
      .collect {
        background-position: -297px -268px;
        &:hover {
          background-position: -297px -288px;
        }
      }
    }

    &:hover .actions {
      display: flex;
    }
  }
`

export const PlaylistFooterWrapper = styled.div`
  height: 32px;
  margin-right: 32px;
  text-align: right;
  line-height: 32px;

  a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
`
