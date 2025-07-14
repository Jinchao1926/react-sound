import { FC, useEffect } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'
import { useAppDispatch } from '@/store'

import { SimilarSong } from './components/SimilarSong'
import SongDetail from './components/SongDetail'
import { SongPlaylist } from './components/SongPlaylist/'
import { UserWiki } from './components/UserWiki'
import { SongLeft, SongRight, SongWrapper } from './Song.styles'
import { fetchSongDatasAsync } from './store'
import { MultiDownload } from '../../components/MultiDownload'

export const Song: FC = () => {
  const { id: songId } = useQueryParamId()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!songId) return
    dispatch(fetchSongDatasAsync(String(songId)))
  }, [dispatch, songId])

  if (!songId) return null

  return (
    <SongWrapper className="wrap-v2">
      <SongLeft>
        <SongDetail />
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
