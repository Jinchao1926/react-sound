import styled, { css } from 'styled-components'

import { Box, Flex, Sprite, Text } from '@/components/UI'

export const PlaylistTracksHeader = styled(Box)`
  height: 33px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PlaylistTracksTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: 1px solid #d9d9d9;

  tbody {
    tr {
      height: 30px;

      // 前三行
      &:nth-of-type(-n + 3) {
        height: 70px;
      }

      // 奇偶
      &:nth-child(odd) {
        background-color: #f7f7f7;
      }
      &:nth-child(even) {
        background-color: white;
      }

      td {
        padding: 6px 10px;
      }
    }
  }
`

export const PlaylistTracksTHeader = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'header',
  component: 'thead',
})``

export const PlaylistTrackTH = styled.th<{ width?: number }>`
  height: 36px;
  color: #666;
  font-weight: normal;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-width: 0 1px 0 1px;

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`

export const New = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'new',
  component: 'span',
})`
  display: inline-block;
  width: 16px;
  height: 17px;
`

export const Duration = styled(Text)`
  padding: 0 10px;
  color: #666;
`

export const Actions = styled(Flex)`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`

export const DurationTD = styled.td`
  padding: 0 !important;

  &:hover ${Duration} {
    display: none;
  }
  &:hover ${Actions} {
    display: flex;
  }
`
