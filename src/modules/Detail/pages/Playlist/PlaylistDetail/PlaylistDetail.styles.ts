import { NavLink } from 'react-router'
import styled from 'styled-components'

export const PlaylistTagLink = styled(NavLink)`
  line-height: 22px;
  padding: 0 13px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
  color: #777;

  background-color: #f5f5f5;
  &:hover {
    background-color: #fdfdfd;
  }
`
