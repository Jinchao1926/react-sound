import { FC } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { SimilarSong } from './components/SimilarSong'
import { SongDetail } from './components/SongDetail'
import { SongPlaylist } from './components/SongPlaylist/'
import { UserWiki } from './components/UserWiki'
import { SongLeft, SongRight, SongWrapper } from './Song.styles'
import { MultiDownload } from '../../components/MultiDownload'

export const Song: FC = () => {
  const { id: songId } = useQueryParamId()

  if (!songId) return null
  return (
    <SongWrapper className="wrap-v2">
      <SongLeft>
        <SongDetail songId={songId} />
      </SongLeft>
      <SongRight>
        <SongPlaylist songId={songId} />
        <SimilarSong songId={songId} />
        <MultiDownload />
        <UserWiki songId={songId} />
      </SongRight>
    </SongWrapper>
  )
}
