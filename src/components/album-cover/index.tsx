import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { IAlbumProps, AlbumCoverWrapper } from './style'
import { formatSizedImage } from '@/utils/format-utils'

interface IProps {
  children?: ReactNode,
  info: any,
  small: boolean
}

const AlbumCover: FC<IProps> = (prop: IProps) => {
  // props & state
  const { info, small = true } = prop
  
  const [style, setStyle] = useState<IAlbumProps>(
    {width: 118, imgSize: 100, position: '-570px'}
  )
  const [coverUrl, setCoverUrl] = useState<string>('')
  const [albumUrl, setAlbumUrl] = useState<string>('')
  const [artistUrl, setArtistUrl] = useState<string>('')

  // useEffect
  useEffect(() => {
    if (small) {
      setStyle({width: 118, imgSize: 100, position: '-570px'})
    } else {
      setStyle({width: 150, imgSize: 130, position: '-845px'})
    }
  }, [small])

  useEffect(() => {
    setCoverUrl(formatSizedImage(info.picUrl, style.imgSize))
    setAlbumUrl(`/album?id=${info.id}`)
    setArtistUrl(`/artist?id=${info.artist.id}`)
  }, [info, style.imgSize])

  // other handlers
  function handlePlayAlbumn() {
    // 这是唱片，如何播放？
    console.log('handlePlayAlbumn')
  }

  return (
    <AlbumCoverWrapper className='album-cover' 
      width={style.width} 
      imgSize={style.imgSize} 
      position={style.position}
      >
      <div className='cover'>
        <img src={coverUrl} alt={info.name} />
        <NavLink className='background sprite_cover' to={albumUrl}> </NavLink>
        <button className='play sprite_icon' title='播放' onClick={handlePlayAlbumn} />
      </div>
      <NavLink className='name no-wrap album' to={albumUrl}>{info.name}</NavLink>
      <NavLink className='name no-wrap artist' to={artistUrl}>{info.artist.name}</NavLink>
    </AlbumCoverWrapper>
  )
}

export default memo(AlbumCover)