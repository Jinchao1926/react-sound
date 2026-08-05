import { NavLink } from 'react-router'
import styled from 'styled-components'

export const LetterButton = styled(NavLink)<{ $selected?: boolean }>`
  background-color: ${(props) => (props.$selected ? '#c20c0c' : 'transparent')};
  color: ${(props) => (props.$selected ? 'white' : '#333')};
  text-align: center;
  line-height: 24px;
  height: 24px;
  width: 21px;

  :hover {
    text-decoration: underline;
  }
`

export const ChineseButton = styled(LetterButton)`
  width: 45px !important;
`
