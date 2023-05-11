import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { IAlbumProps, AlbumCoverWrapper } from './style'
import { formatSizedImage } from '@/utils/format-utils'

interface IProps {
  children?: ReactNode,
  info: any,
  style?: IAlbumProps
}

const AlbumCover: FC<IProps> = (prop: IProps) => {
  const { info, style = {width: 118, imgSize: 100} } = prop

  return (
    <AlbumCoverWrapper width={style.width} imgSize={style.imgSize}>
      <div className='cover'>
        <img src={formatSizedImage(info.picUrl, style.imgSize)} alt={info.name} />
        <a className='background sprite_cover' href={`/album?id=${info.id}`}> </a>
        <a className='play sprite_icon' href='todo' title='播放'> </a>
      </div>
      <a className='name album' href={`/album?id=${info.id}`}>{info.name}</a>
      <a className='name artist' href={`/album?id=${info.id}`}>{info.artist.name}</a>
    </AlbumCoverWrapper>
  )
}

export default memo(AlbumCover)