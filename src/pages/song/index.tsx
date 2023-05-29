import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '@/store'
import { fetchSongDatasAsync } from './store'

import { 
  SongWrapper,
  SongLeft,
  SongRight
} from './style'
import SongDetail from './c-components/song-detail'
import SimilarPlaylist from './c-components/similar-playlist'

interface IProps {
  children?: ReactNode
}

const Song: FC<IProps> = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const songId = queryParams.get('id')
  console.log("songId:", songId)

  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log("useEffect")
    if (!songId) return
    dispatch(fetchSongDatasAsync(songId))
  }, [dispatch, songId])

  return (
    <SongWrapper className='wrap-v2'>
      <SongLeft>
        <SongDetail />
      </SongLeft>
      <SongRight>
        <SimilarPlaylist />
      </SongRight>
    </SongWrapper>
  )
}

export default memo(Song)