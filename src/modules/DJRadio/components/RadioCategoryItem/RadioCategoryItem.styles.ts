import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const RadioCategoryImage = styled.div<{ bgImage: string }>`
  width: 48px;
  height: 48px;
  margin: 0 auto;
  background-image: url(${(props) => props.bgImage});
`

export const RadioCategoryName = styled.span`
  display: block;
  margin-top: -1px;
`

export const RadioCategoryLink = styled(NavLink)`
  background: url(${require('@/assets/img/radio_category.png')}) no-repeat 0
    9999px;
  width: 70px;
  height: 70px;
  text-align: center;
  font-size: 12px;
  color: #888;
  cursor: pointer;
  margin: 2px 33px 23px 0;

  :nth-child(9n) {
    margin-right: 0;
  }

  &:hover {
    background-position: 0 0;
    color: #888;
  }
  &.selected {
    background-position: -70px 0;
    color: #d35757;

    ${RadioCategoryImage} {
      background-position: -48px 0;
    }
  }
`
