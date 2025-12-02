import { FC } from 'react'

import { useAlbumDetailQuery } from '@/hooks/album/useAlbumDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { AlbumDetail } from './AlbumDetail'
import { PopularArtistAlbums } from './PopularArtistAlbums'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const Album: FC = () => {
  const { id: albumId } = useQueryParamId()
  const { data } = useAlbumDetailQuery(albumId)

  if (!albumId || !data) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <AlbumDetail albumId={albumId} />
      </DetailLeftContent>
      <DetailRightContent>
        <PopularArtistAlbums artistId={data.album.artist.id} />
        <MultiDownload />
        <UserWiki id={albumId} type="album" />
      </DetailRightContent>
    </DetailWrapper>
  )
}
