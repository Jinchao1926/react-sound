import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { 
  fetchPlaylistCategoriesAsync,
  fetchPlaylistsAsync
} from './store'

import { PlaylistWrapper } from './style'
import PlaylistHeader from './c-components/playlist-header'
import PlaylistCovers from './c-components/playlist-covers'

interface IProps {
  children?: ReactNode
}

const Playlist: FC<IProps> = () => {
  // Fetch categories
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPlaylistCategoriesAsync())
    dispatch(fetchPlaylistsAsync(0))
  }, [dispatch])

  const onMouseDown = () => {

  }
  const onContentMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return (
    <PlaylistWrapper onMouseDown={onMouseDown}>
      <div className='content wrap-v2' onMouseDown={onContentMouseDown}>
        <PlaylistHeader />
        <PlaylistCovers />
      </div>
    </PlaylistWrapper>
  )
}

export default memo(Playlist)