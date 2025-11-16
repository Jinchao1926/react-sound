import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const SingerLink = styled(NavLink)`
  display: flex;
  margin-top: 14px;
  width: 210px;
  height: 62px;
  background: #fafafa;

  &:hover {
    background-color: #f4f4f4;
  }
`

export const SingerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 133px;
  height: 60px;
  padding-left: 14px;
  border: 1px solid #e9e9e9;
`

export const BecomeSingerLink = styled.a`
  display: block;
  height: 30px;
  line-height: 30px;
  margin: 0 20px;
  border-radius: 4px;
  border: 1px solid #c3c3c3;
  color: #333;
  text-align: center;
  font-weight: 700;
  background-color: #fafafa;
  &:hover {
    background-color: #fff;
  }
`
