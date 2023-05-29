import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SimilarPlaylistWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const SimilarPlaylist: FC<IProps> = () => {
  return (
    <SimilarPlaylistWrapper>
      <div className='header'>
        <span className='title'>包含这首歌的歌单</span>
      </div>
      <div className='playlists'>
        
      </div>
    </SimilarPlaylistWrapper>
  )
}

export default memo(SimilarPlaylist)