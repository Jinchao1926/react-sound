import type { FC, ReactNode } from 'react'
import { memo, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '@/store'

import MultiDownload from './components/MultiDownload'
import SimilarPlaylist from './components/SimilarPlaylist'
import SimilarSong from './components/SimilarSong'
import SongDetail from './components/SongDetail'
import UserWiki from './components/UserWiki'
import { fetchSongDatasAsync } from './store'
import { SongLeft, SongRight, SongWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Song: FC<IProps> = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const songId = queryParams.get('id')

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!songId) return
    dispatch(fetchSongDatasAsync(songId))
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
        <UserWiki songId={songId || ''} />
      </SongRight>
    </SongWrapper>
  )
}

export default memo(Song)
