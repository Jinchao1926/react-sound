import type { FC, ReactNode } from 'react'
import { memo, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import UserLink from '@/components/user-link'
import { formatSizedImage } from '@/utils/format-utils'

import { AlbumCoverWrapper, IAlbumProps } from './style'

interface IProps {
  children?: ReactNode
  info: any
  small: boolean
}

const AlbumCover: FC<IProps> = (prop: IProps) => {
  // props & state
  const { info, small = true } = prop

  const [style, setStyle] = useState<IAlbumProps>(new IAlbumProps(118, 100))
  const [coverUrl, setCoverUrl] = useState<string>('')
  const [albumUrl, setAlbumUrl] = useState<string>('')

  // useEffect
  useEffect(() => {
    if (small) {
      setStyle(new IAlbumProps(118, 100))
    } else {
      setStyle(new IAlbumProps(150, 130))
    }
  }, [small])

  useEffect(() => {
    setCoverUrl(formatSizedImage(info.picUrl, style.imgSize))
    setAlbumUrl(`/album?id=${info.id}`)
  }, [info, style.imgSize])

  // other handlers
  function handlePlayAlbumn() {
    // 这是唱片，如何播放？
    // eslint-disable-next-line no-console
    console.log('handlePlayAlbumn')
  }

  return (
    <AlbumCoverWrapper
      className="album-cover"
      width={style.width}
      imgSize={style.imgSize}
      isLarge={style.isLarge}
    >
      <div className="cover">
        <img src={coverUrl} alt={info.name} />
        <NavLink className="background sprite_cover" to={albumUrl}>
          {' '}
        </NavLink>
        <button
          className="play sprite_icon"
          title="播放"
          onClick={handlePlayAlbumn}
        />
      </div>
      <NavLink className="name no-wrap album" to={albumUrl}>
        {info.name}
      </NavLink>
      <UserLink users={info.artists} showSpace={true} />
    </AlbumCoverWrapper>
  )
}

export default memo(AlbumCover)
