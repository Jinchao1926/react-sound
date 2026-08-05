import { NavLink } from 'react-router'
import styled from 'styled-components'

import { Flex, Sprite, Text } from '@/components/Core'

interface TrackCollectionTableProps {
  $enlargeFirstThreeRows?: boolean
  $bordered?: boolean
}
export const TrackCollectionTable = styled.table<TrackCollectionTableProps>`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  ${({ $bordered = true }) =>
    $bordered &&
    `
      border-left: 1px solid #d9d9d9;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    `}

  tbody {
    tr {
      height: 30px;

      // 前三行
      &:nth-of-type(-n + 3) {
        height: ${({ $enlargeFirstThreeRows = true }) =>
          $enlargeFirstThreeRows ? '70px' : '30px'};
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

export const TrackCollectionCol = styled.col<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
`

export const TrackCollectionTHeader = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'header',
  component: 'thead',
})``

export const TrackCollectionTH = styled.th`
  height: 36px;
  color: #666;
  font-weight: normal;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-width: 0 1px 0 1px;
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

export const DownloadText = styled.p`
  line-height: 18px;
  font-size: 13px;
  color: #333;
  margin: 0;
`

export const DownloadLink = styled(NavLink)`
  background-color: #ff291c;
  color: white;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 18px;
`
