import styled from 'styled-components'

import { Sprite } from '@/components/Core'
import { CloseButton } from '@/components/Shared/Playlist'

import { PlaylistButton } from './PlaylistButton'

export const PlaylistWrapper = styled.div`
  position: fixed;
  z-index: 80;
  left: 0;
  right: 0;
  bottom: 47px;
  width: 976px;
  height: 300px;
  margin: 0 auto;
  background-color: #333;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
`

export const PlaylistHeader = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'bg',
})`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 41px;
  padding: 0 5px;
`

export const PlaylistTitle = styled.h4`
  color: #e2e2e2;
  font-size: 14px;
  line-height: 40px;
  padding-left: 25px;
  margin: 0;
`

export const CollectPlaylist = styled(PlaylistButton)`
  position: absolute;
  left: 398px;
  top: 12px;
`

export const Separator = styled.span`
  position: absolute;
  left: 477px;
  top: 11px;
  display: inline-block;
  background-color: #333;
  width: 1px;
  height: 16px;
`

export const ClearPlaylist = styled(PlaylistButton).attrs({ type: 'clear' })`
  position: absolute;
  left: 490px;
  top: 12px;
`

export const CurrentTrackTitle = styled.p`
  position: absolute;
  left: 595px;
  top: 0;
  margin: 0;
  width: 346px;
  color: white;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
`

export const ClosePlaylistButton = styled(CloseButton)`
  margin-right: 8px;
  z-index: 2;
`
