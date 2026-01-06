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

export const PageButton = styled.button<{ $active?: boolean }>`
  background: url(${paginationImg}) no-repeat 0 9999px;
  border: 1px solid ${({ $active }) => ($active ? '#a2161b' : '#ccc')};
  border-radius: 2px;
  margin: 0 1px;
  padding: 0 8px;
  min-width: 22px;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  color: ${({ $active }) => ($active ? '#fff' : '#333')};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};

  ${({ $active }) =>
    $active &&
    `
    background-position: 0 -650px;
  `}

  &:disabled {
    color: #cacaca;
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not([aria-current='true']) {
    border-color: #a2161b;
  }
`

export const Ellipsis = styled.span`
  margin: 0 5px;
  color: #333;
  font-size: 12px;
`

export const PaginationWrapper = styled.div`
  margin: 20px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`
