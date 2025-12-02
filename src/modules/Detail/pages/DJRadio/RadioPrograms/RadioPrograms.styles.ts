import styled from 'styled-components'

import { Box, Flex } from '@/components/Core'

export const ProgramCollectionHeaderWrapper = styled(Flex)`
  height: 33px;
  border-bottom: 2px solid #c20c0c;
  justify-content: space-between;
  align-items: center;
`

export const ProgramCollectionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  tbody {
    tr {
      height: 55px;

      // 奇偶
      &:nth-child(odd) {
        background-color: white;
      }
      &:nth-child(even) {
        background-color: #f7f7f7;
      }

      td {
        padding: 0 10px;
        height: 55px;
      }
    }
  }
`

export const ProgramCollectionCol = styled.col<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
`

export const SocialActions = styled(Box)`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  flex: 1;
`

export const ProgramNameTD = styled.td`
  display: flex;
  align-items: center;
  padding: 0 10px 0 0 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover ${SocialActions} {
    display: inline-flex;
  }
`
