import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SongCoverWrapper } from './style'
import { formatCount, formatSizedImage } from '@/utils/format-utils'

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
          <img src={formatSizedImage(info.picUrl, 160)} alt={info.name} />
        </a>
        
        <div className='panel sprite_cover'>
          <span className='headset sprite_icon' />
          <span className='play-count'>{formatCount(info.playCount)}</span>
          <a className='play sprite_icon' href='todo' title='播放'> </a>
        </div>
      </div>
      <a className='cover-info' href={`/playlist?id=${info.id}`}>{info.name}</a>
    </SongCoverWrapper>
  )
}

export default memo(SongCover)