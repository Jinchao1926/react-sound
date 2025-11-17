import { FC, useMemo } from 'react'

import { CoverImage } from '@/components/CoverImage'
import { Box } from '@/components/UI'
import { UserLink } from '@/components/UserLink'
import { Album } from '@/types/music'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  AlbumCoverWrapper,
  AlbumnNameLink,
  CoverPlayButton,
  IAlbumStyleConfig,
  getAlbumStyleConfig,
} from './AlbumCover.styles'

interface AlbumCoverProps {
  album: Album
  isLarge?: boolean
}

export const AlbumCover: FC<AlbumCoverProps> = ({ album, isLarge = true }) => {
  const config = useMemo<IAlbumStyleConfig>(
    () => getAlbumStyleConfig(isLarge),
    [isLarge]
  )

  const coverUrl = useMemo(
    () => formatSizedImage(album.picUrl, config.imgSize),
    [album.picUrl, config.imgSize]
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
      width={config.width}
      imgSize={config.imgSize}
      isLarge={config.isLarge}
    >
      <CoverImage
        src={coverUrl}
        to={albumUrl}
        alt={album.name}
        size={config.imgSize}
        coverSprite="cover"
        coverIcon={config.isLarge ? 'albumLarge' : 'album'}
        coverWidth={config.width}
      >
        <CoverPlayButton isLarge={config.isLarge} onClick={handlePlayAlbumn} />
      </CoverImage>

      <AlbumnNameLink to={albumUrl} nowrap isLarge={config.isLarge}>
        {album.name}
      </AlbumnNameLink>

      <Box mr={10}>
        <UserLink
          users={album.artists ? album.artists : [album.artist]}
          space
        />
      </Box>
    </AlbumCoverWrapper>
  )
}
