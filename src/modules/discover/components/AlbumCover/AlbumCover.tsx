import { FC, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import UserLink from '@/components/UserLink'
import { Album } from '@/types/music'
import { formatSizedImage } from '@/utils/format-utils'

import { AlbumCoverWrapper, IAlbumProps } from './AlbumCover.styles'

interface AlbumCoverProps {
  album: Album
  small?: boolean
}

export const AlbumCover: FC<AlbumCoverProps> = ({ album, small = true }) => {
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
    setCoverUrl(formatSizedImage(album.picUrl, style.imgSize))
    setAlbumUrl(`/album?id=${album.id}`)
  }, [album, style.imgSize])

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
        <img src={coverUrl} alt={album.name} />
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
        {album.name}
      </NavLink>
      {/* 处理兼容类型 */}
      <UserLink
        users={
          album.artists
            ? album.artists.map((artist) => ({
                id: String(artist.id),
                name: artist.name,
              }))
            : [
                {
                  id: String(album.artist.id),
                  name: album.artist.name,
                },
              ]
        }
        showSpace={true}
      />
    </AlbumCoverWrapper>
  )
}
