import { type FC } from 'react'

import { useSongDetailQuery } from '@/hooks/song/useSongDetailQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { SimilarSong } from './SimilarSong'
import { SongDetail } from './SongDetail'
import { SongSimilarPlaylist } from './SongSimilarPlaylist'
import { DetailDataWrapper } from '../../components/DetailDataWrapper'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const Song: FC = () => {
  const { id: songId } = useQueryParamId()
  const { data: song, isLoading, isError } = useSongDetailQuery(songId)

  if (!songId) return null

  return (
    <DetailDataWrapper data={song} isLoading={isLoading} isError={isError}>
      <DetailWrapper>
        <DetailLeftContent>
          <SongDetail songId={songId} />
        </DetailLeftContent>
        <DetailRightContent>
          <SongSimilarPlaylist songId={songId} />
          <SimilarSong songId={songId} />
          <MultiDownload />
          <UserWiki id={songId} type="song" />
        </DetailRightContent>
      </DetailWrapper>
    </DetailDataWrapper>
  )
}
