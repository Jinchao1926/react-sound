import { type FC } from 'react'

import { usePlaylistDetailQuery } from '@/hooks/playlist/usePlaylistDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { PlaylistDetail } from './PlaylistDetail'
import { PlaylistSubscribers } from './PlaylistSubscribers'
import { RelatedPlaylists } from './RelatedPlaylists'
import { DetailDataWrapper } from '../../components/DetailDataWrapper'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const Playlist: FC = () => {
  const { id: playlistId } = useQueryParamId()
  const {
    data: playlist,
    isLoading,
    isError,
  } = usePlaylistDetailQuery(playlistId)

  if (!playlistId) return null

  return (
    <DetailDataWrapper data={playlist} isLoading={isLoading} isError={isError}>
      <DetailWrapper>
        <DetailLeftContent>
          <PlaylistDetail playlistId={playlistId} />
        </DetailLeftContent>
        <DetailRightContent>
          <PlaylistSubscribers playlistId={playlistId} />
          <RelatedPlaylists playlistId={playlistId} />
          <MultiDownload />
        </DetailRightContent>
      </DetailWrapper>
    </DetailDataWrapper>
  )
}
