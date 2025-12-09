import styled from 'styled-components'

import { Sprite, TextNavLink } from '@/components/Core'

export const AlbumList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -18px;
  margin-bottom: 20px;
`

export const AlbumName = styled.p`
  margin: 8px 0 3px;
  width: 145px;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const AlbumnLink = styled(TextNavLink)`
  display: inline;
  line-height: 19px;
  font-size: 14px;
  word-break: break-all;
`

export const CoverPlayButton = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playInCoverLarge',
  component: 'button',
  title: '播放',
})`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 28px;
  height: 28px;
  display: none;
`

export const AlbumItem = styled.div`
  margin-bottom: 10px;
  flex-basis: 25%;

  .cover-image:hover ${CoverPlayButton} {
    display: block;
  }
`
