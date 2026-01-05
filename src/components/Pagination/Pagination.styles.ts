import styled from 'styled-components'

import paginationImg from '@/assets/img/pagination.png'

export const PaginationButton = styled.button`
  background: url(${paginationImg}) no-repeat 0 9999px;
  width: 71px;
  height: 26px;
  line-height: 24px;
  margin: -2px 2px 0 0;
  border: 1px solid #ccc;
  border-radius: 2px;

  &:disabled {
    color: #cacaca !important;
  }
`

export const PrevButton = styled(PaginationButton)`
  padding: 0 0 0 12px;
  background-position: 0 -560px;
  &:disabled {
    background-position: 0 -620px;
  }
`

export const NextButton = styled(PaginationButton)`
  padding: 0 12px 0 0;
  background-position: -75px -560px;
  &:disabled {
    background-position: -75px -620px;
  }
`

export const PaginationWrapper = styled.div`
  .pagination {
    margin: 20px 0;
    text-align: center;

    .ant-pagination-item {
      background: url(${paginationImg}) no-repeat 0 9999px;
      border: 1px solid #ccc !important;
      border-radius: 2px;
      margin: 0 5px;
      a {
        padding: 0 8px;
        color: #333;
        font-size: 12px;
      }

      &.ant-pagination-item-active {
        border-color: #a2161b !important;
        a {
          background: url(${paginationImg}) no-repeat 0 9999px;
          background-position: 0 -650px;
          color: #fff;
        }
      }
    }
  }
`
