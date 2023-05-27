import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { 
  PlayerWrapper,
  PlayerLeft,
  PlayerRight
} from './style'
import LyricPanel from './c-components/lyric-panel'

interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  return (
    <PlayerWrapper className='wrap-v2'>
      <PlayerLeft>
        <LyricPanel />
      </PlayerLeft>
      <PlayerRight>包含这首歌的歌单</PlayerRight>
    </PlayerWrapper>
  )
}

export default memo(Player)