import styled from 'styled-components'

import { Flex, Sprite } from '@/components/Core'
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

export const PlaylistTrackTableWrapper = styled.div`
  width: 558px;
  height: 260px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #404040;
    border: 1px solid #4f4f4f;
    border-radius: 5px;
  }
`

export const PlaylistTrackTable = styled.table`
  width: 100%;
  background-color: #151515;
  border-collapse: collapse;

  td {
    padding-left: 10px;
  }
`

export const PlaylistTrackCol = styled.col<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
`

export const PlaylistTrackActions = styled(Flex)`
  display: none;
  gap: 6px;
`

export const PlaylistTrackTR = styled.tr`
  height: 28px;
  background-color: #151515;
  cursor: pointer;

  &:hover {
    background-color: #0f0f0f;

    /* Make all text content white on hover, including nested elements */
    td,
    td * {
      color: white !important;
    }

    ${PlaylistTrackActions} {
      display: flex;
    }
  }
`

export const PlaylistTrackTD = styled.td<{ color?: string }>`
  color: ${({ color }) => color || '#ccc'};
`

export const PlayingIcon = styled(Sprite).attrs({
  sprite: 'playlist',
  icon: 'play',
  component: 'span',
})`
  display: inline-block;
  width: 10px;
  height: 12px;
  margin: auto 0;
`
