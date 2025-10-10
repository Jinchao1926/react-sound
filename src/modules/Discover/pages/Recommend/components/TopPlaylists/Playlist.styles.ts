import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from '@/components/UI'

export const PlaylistCover = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`

export const PlaylistLink = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

// Song
export const SongIndex = styled.span`
  width: 35px;
  margin-left: 15px;
  font-size: 16px;
  color: #666;
  text-align: center;
`

export const SongActions = styled.div`
  display: none;
  align-items: center;
  padding: 0 15px 0 5px;
  gap: 8px;
`

export const SongItem = styled(Flex)`
  position: relative;
  align-items: center;
  height: 32px;

  // 前三个高亮
  :nth-child(-n + 3) ${SongIndex} {
    color: #c10d0c;
  }

  &:hover ${SongActions} {
    display: flex;
  }
`
