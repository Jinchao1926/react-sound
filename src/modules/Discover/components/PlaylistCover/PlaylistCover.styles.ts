import styled from 'styled-components'

import { CoverImage } from '@/components/CoverImage'
import { TextNavLink } from '@/components/UI'
import { Sprite } from '@/components/UI/Spirit/Sprite'

export const PlaylistCoverImage = styled(CoverImage)`
  position: relative;
`

export const PlaylistCoverPanel = styled(Sprite).attrs({
  sprite: 'cover',
  icon: 'panel',
})`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 27px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeadsetIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'headset',
  component: 'span',
})`
  width: 14px;
  height: 14px;
`

export const PlayButton = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'playInPanel',
  component: 'button',
  title: '播放',
})`
  width: 16px;
  height: 17px;
`

export const PlaylistNameLink = styled(TextNavLink)`
  margin: 8px 0 3px;
  font-size: 14px;
  color: #000;
  max-width: 140px;
  line-height: 1.4;
`

export const PlaylistCreatorLink = styled(TextNavLink)`
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
`
