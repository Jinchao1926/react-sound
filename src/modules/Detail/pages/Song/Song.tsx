import { FC, useEffect } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'
import { useAppDispatch } from '@/store'

import MultiDownload from './components/MultiDownload'
import SimilarPlaylist from './components/SimilarPlaylist'
import SimilarSong from './components/SimilarSong'
import SongDetail from './components/SongDetail'
import UserWiki from './components/UserWiki'
import { SongLeft, SongRight, SongWrapper } from './Song.styles'
import { fetchSongDatasAsync } from './store'

export const Song: FC = () => {
  const { id: songId } = useQueryParamId()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!songId) return
    dispatch(fetchSongDatasAsync(String(songId)))
  }, [dispatch, songId])

  return (
    <SongWrapper className="wrap-v2">
      <SongLeft>
        <SongDetail />
      </SongLeft>
      <SongRight>
        <SimilarPlaylist />
        <SimilarSong />
        <MultiDownload />
        <UserWiki songId={String(songId) || ''} />
      </SongRight>
    </SongWrapper>
  )
}
