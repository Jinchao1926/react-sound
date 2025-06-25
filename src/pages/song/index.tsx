import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useLocation } from 'react-router-dom'

import MultiDownload from './c-components/multi-download'
import SimilarPlaylist from './c-components/similar-playlist'
import SimilarSong from './c-components/similar-song'
import SongDetail from './c-components/song-detail'
import UserWiki from './c-components/user-wiki'
import { fetchSongDatasAsync } from './store'
import { SongWrapper, SongLeft, SongRight } from './style'
import { useAppDispatch } from '@/store'

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
