import { type FC } from 'react'

import { useAlbumDetailQuery } from '@/hooks/album/useAlbumDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { AlbumDetail } from './AlbumDetail'
import { PopularArtistAlbums } from './PopularArtistAlbums'
import { DetailDataWrapper } from '../../components/DetailDataWrapper'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const Album: FC = () => {
  const { id: albumId } = useQueryParamId()
  const { data, isLoading, isError } = useAlbumDetailQuery(albumId)

  if (!albumId || !data) return null

  return (
    <DetailDataWrapper data={data} isLoading={isLoading} isError={isError}>
      <DetailWrapper>
        <DetailLeftContent>
          <AlbumDetail albumId={albumId} />
        </DetailLeftContent>
        <DetailRightContent>
          {/* no `喜欢这张专辑的人` endpoint */}
          <PopularArtistAlbums artistId={data.album.artist.id} />
          <MultiDownload />
          <UserWiki id={albumId} type="album" />
        </DetailRightContent>
      </DetailWrapper>
    </DetailDataWrapper>
  )
}
