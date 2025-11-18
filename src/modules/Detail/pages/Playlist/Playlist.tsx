import { FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { PlaylistDetail } from './components/PlaylistDetail'
import { MultiDownload } from '../../components/MultiDownload'
import {
  DetailLeftContent,
  DetailRightContent,
  DetailWrapper,
} from '../../components/shared'

export const Playlist: FC = () => {
  const { id: playlistId } = useQueryParamId()

  if (!playlistId) return null
  return (
    <DetailWrapper>
      <DetailLeftContent>
        <PlaylistDetail playlistId={playlistId} />
      </DetailLeftContent>
      <DetailRightContent>
        <MultiDownload />
      </DetailRightContent>
    </DetailWrapper>
  )
}
