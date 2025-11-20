import { FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { SimilarSong } from './components/SimilarSong'
import { SongDetail } from './components/SongDetail'
import { SongPlaylist } from './components/SongPlaylist'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'
import { UserWiki } from '../../components/UserWiki'

export const Song: FC = () => {
  const { id: songId } = useQueryParamId()

  if (!songId) return null
  return (
    <DetailWrapper>
      <DetailLeftContent>
        <SongDetail songId={songId} />
      </DetailLeftContent>
      <DetailRightContent>
        <SongPlaylist songId={songId} />
        <SimilarSong songId={songId} />
        <MultiDownload />
        <UserWiki id={songId} type="song" />
      </DetailRightContent>
    </DetailWrapper>
  )
}
