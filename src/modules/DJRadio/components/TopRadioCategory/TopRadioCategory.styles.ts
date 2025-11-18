import styled from 'styled-components'

import { TextNavLink } from '@/components/UI'

export const TopRadioCategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const TopRadioCategoryItem = styled.div`
  display: flex;
  width: 435px;
  height: 120px;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;

  :nth-last-child(-n + 2) {
    border-bottom: none;
  }
`

export const RadioNameLink = styled(TextNavLink)`
  margin: 16px 0 20px;
  font-size: 18px;
  font-weight: 700;
`
