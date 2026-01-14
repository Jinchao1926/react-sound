import { type FC, useMemo } from 'react'

import { CoverImage } from '@/components/CoverImage'
import { UserLink } from '@/components/Links'
import { type Album } from '@/types/music'
import { formatSizedImage } from '@/utils/format/dataFormat'

import {
  AlbumCoverWrapper,
  AlbumnNameLink,
  CoverPlayButton,
  type IAlbumStyleConfig,
  UserLinkContainer,
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
    // TODO: Implement album playback logic
  }

  return (
    <AlbumCoverWrapper className="album-cover" width={config.width}>
      <CoverImage
        src={coverUrl}
        to={albumUrl}
        alt={album.name}
        size={config.imgSize}
        coverSprite="cover"
        coverIcon={config.isLarge ? 'albumMedium' : 'album'}
        coverWidth={config.width}
      >
        <CoverPlayButton $isLarge={config.isLarge} onClick={handlePlayAlbumn} />
      </CoverImage>

      <AlbumnNameLink to={albumUrl} nowrap $isLarge={config.isLarge}>
        {album.name}
      </AlbumnNameLink>

      <UserLinkContainer $isLarge={config.isLarge}>
        <UserLink
          users={album.artists ? album.artists : [album.artist]}
          block
          space
        />
      </UserLinkContainer>
    </AlbumCoverWrapper>
  )
}
