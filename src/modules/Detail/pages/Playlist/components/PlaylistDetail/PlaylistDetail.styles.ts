import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const PlaylistCover = styled.div`
  position: relative;
  padding: 4px;
  border: 1px solid #ccc;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
`

export const PlaylistDescription = styled.p`
  margin: 5px 0 0;
  color: #666;
  line-height: 18px;
  white-space: pre-line;
`

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
