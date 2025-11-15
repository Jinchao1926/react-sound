import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '@/components/UI'

export const PopularAnchorItem = styled(NavLink)`
  display: flex;
  width: 210px;
  height: 40px;
  margin-bottom: 10px;
`

export const PopularAnchorContent = styled(Flex)`
  width: 160px;
  height: 40px;
  flex-direction: column;
  justify-content: space-around;
`
