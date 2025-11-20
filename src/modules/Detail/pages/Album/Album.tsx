import { FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { AlbumDetail } from './components/AlbumDetail'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const Album: FC = () => {
  const { id: albumId } = useQueryParamId()

  if (!albumId) return null

  return (
    <DetailWrapper>
      <DetailLeftContent>
        <AlbumDetail albumId={albumId} />
      </DetailLeftContent>
      <DetailRightContent>
        {/* <PlaylistSubscribers playlistId={playlistId} />
        <RelatedPlaylists playlistId={playlistId} /> */}
        <MultiDownload />
      </DetailRightContent>
    </DetailWrapper>
  )
}
