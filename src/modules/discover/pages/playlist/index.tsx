import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useLocation } from 'react-router-dom'

import { useAppDispatch } from '@/store'

import PlaylistCovers from './components/PlaylistCovers'
import PlaylistHeader from './components/PlaylistHeader'
import {
  fetchPlaylistCategoriesAsync,
  fetchPlaylistsAsync,
  changeCurrentCategoryAsync,
} from './store'
import { PlaylistWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Playlist: FC<IProps> = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('cat')

  // Change category from query params
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!category) return
    dispatch(changeCurrentCategoryAsync(category))
  }, [dispatch, category])

  // Fetch categories
  useEffect(() => {
    dispatch(fetchPlaylistCategoriesAsync())
    dispatch(fetchPlaylistsAsync(0))
  }, [dispatch])

  const onMouseDown = () => {}

  return (
    <PlaylistWrapper onMouseDown={onMouseDown}>
      <div className="content wrap-v2" onMouseDown={(e) => e.stopPropagation()}>
        <PlaylistHeader />
        <PlaylistCovers />
      </div>
    </PlaylistWrapper>
  )
}

export default memo(Playlist)
