import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Head } from '@/components/Core'

export const CategoryHead = styled(Head)`
  padding: 0 10px 12px 15px;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`

export const CategoryLink = styled(NavLink)`
  display: block;
  padding: 10px 0 10px 20px;
  &:hover {
    background-color: #f4f4f4;
  }
  &.selected {
    background-color: #e6e6e6;
  }
`
