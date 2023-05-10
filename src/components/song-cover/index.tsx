import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SongCoverWrapper } from './style'

interface IProps {
  children?: ReactNode,
  info: any
}

const SongCover: FC<IProps> = (props: IProps) => {
  const { info } = props

  return (
    <SongCoverWrapper>
      <div className='cover'>
        <a href={`/playlist?id=${info.id}`}> 
          <img src={`${info.picUrl}?param=140y140`} alt={info.name} />
        </a>
        
        <div className='panel sprite_cover'>
          <span className='headset sprite_icon' />
          <span className='play-count'>{`${info.playCount/10000}万`}</span>
          <a className='play sprite_icon' href='todo' title='播放'> </a>
        </div>
      </div>
      <a className='cover-info' href={`/playlist?id=${info.id}`}>{info.name}</a>
    </SongCoverWrapper>
  )
}

export default memo(SongCover)