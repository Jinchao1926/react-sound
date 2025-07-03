import { FC, useMemo } from 'react'

import { NavLink } from 'react-router-dom'

import UserLink from '@/components/UserLink'
import { Album } from '@/types/music'
import { formatSizedImage } from '@/utils/format-utils'

import {
  AlbumCoverWrapper,
  IAlbumStyleConfig,
  getAlbumStyleConfig,
} from './AlbumCover.styles'

interface AlbumCoverProps {
  album: Album
  isLarge?: boolean
}

export const AlbumCover: FC<AlbumCoverProps> = ({ album, isLarge = true }) => {
  const style = useMemo<IAlbumStyleConfig>(
    () => getAlbumStyleConfig(isLarge),
    [isLarge]
  )

  const coverUrl = useMemo(
    () => formatSizedImage(album.picUrl, style.imgSize),
    [album.picUrl, style.imgSize]
  )
  const albumUrl = useMemo(() => `/album?id=${album.id}`, [album.id])

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
