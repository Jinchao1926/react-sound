import styled from 'styled-components'

import { Sprite, TextNavLink } from '@/components/UI'

export interface IAlbumStyleConfig {
  width: number
  imgSize: number
  isLarge: boolean
}

export const getAlbumStyleConfig = (isLarge: boolean): IAlbumStyleConfig => {
  const imgSize = isLarge ? 130 : 100
  const width = isLarge ? 150 : 118

  return { width, imgSize, isLarge }
}

export const CoverPlayButton = styled(Sprite).attrs<{ $isLarge: boolean }>(
  (props) => ({
    sprite: 'icon',
    icon: props.$isLarge ? 'playInCoverLarge' : 'playInCover',
    component: 'button',
    title: '播放',
  })
)<{ $isLarge: boolean }>`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: ${(props) => (props.$isLarge ? '28px' : '22px')};
  height: ${(props) => (props.$isLarge ? '28px' : '22px')};
  display: none;
`

export const AlbumnNameLink = styled(TextNavLink)<{ $isLarge: boolean }>`
  line-height: 1.5;
  font-size: ${(props) => (props.$isLarge ? '14px' : '12px')};
  width: ${(props) => (props.$isLarge ? '130px' : '100px')};
  margin-bottom: ${(props) => (props.$isLarge ? '4px' : '0')};
  margin-top: 8px;

  color: #000;
  &:hover {
    color: #000;
  }
`

export const AlbumCoverWrapper = styled.div<{ width: number }>`
  width: ${(props) => props.width + 'px'};

  .cover-image:hover ${CoverPlayButton} {
    display: block;
  }
`

export const UserLinkContainer = styled.div<{ $isLarge: boolean }>`
  width: ${(props) => (props.$isLarge ? '130px' : '100px')};
`
