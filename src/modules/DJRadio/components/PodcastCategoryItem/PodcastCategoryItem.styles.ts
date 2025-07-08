import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const PodcastCategoryLink = styled(NavLink)`
  width: 70px;
  height: 72px;
  text-align: center;
  color: #888;
  font-size: 12px;
  cursor: pointer;
  margin: 2px 33px 23px 0;
  :nth-child(9n) {
    margin-right: 0;
  }

  &:hover {
    background-position: 0 0;
  }
  &.selected {
    background-position: -70px 0;
    color: #d35757;
    .icon {
      background-position: -48px 0;
    }
  }
`

export const PodcastCategoryImage = styled.div<{ bgImage: string }>`
  width: 48px;
  height: 48px;
  margin: 0 auto;
  background-image: url(${(props) => props.bgImage});
`

export const PodcastCategoryName = styled.span`
  display: block;
  margin-top: -1px;
`
