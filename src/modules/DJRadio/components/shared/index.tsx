import { NavLink } from 'react-router'
import styled from 'styled-components'

export const ProgramList = styled.div`
  border: 1px solid #e2e2e2;
  border-width: 0 1px 1px;
`

export const ProgramItem = styled.div<{ pl?: number }>`
  height: 40px;
  padding: 10px 0;
  padding-left: ${({ pl }) => pl}px;
  display: flex;
  align-items: center;
  // 奇偶
  :nth-child(odd) {
    background-color: white;
  }
  :nth-child(even) {
    background-color: #f7f7f7;
  }
  &:hover {
    background-color: #eee;
  }
`

export const CategoryLink = styled(NavLink)`
  display: inline-block;
  color: #999;
  height: 16px;
  padding: 0 6px;
  margin-left: 10px;
  border: 1px solid #999;
  line-height: 16px;
  &:hover {
    color: #666;
    border: 1px solid #666;
  }
`
