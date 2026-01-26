import styled from 'styled-components'

import { Flex, Sprite } from '@/components/Core'

export const PlaylistTrackTableWrapper = styled.div`
  position: relative;
  background-color: #151515;
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

export const TrackDivider = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  width: 6px;
  height: 100%;
`
