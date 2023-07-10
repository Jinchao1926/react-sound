import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { useAppSelector, useAppDispatch } from '@/store'
import { fetchPlaylistsAsync } from '../../store'

import { PlaylistCoversWrapper } from './style'
import SongCover from '@/components/song-cover'
import JCPagination from '@/components/pagination'

interface IProps {
  children?: ReactNode
}

const PlaylistCovers: FC<IProps> = () => {
  // state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [playlists, setPlaylists] = useState<any[]>([])
  // redux 
  const { currentCategory, pages, total } = useAppSelector(
    (state) => ({
      currentCategory: state.playlist.currentCategory,
      pages: state.playlist.pagePlaylists,
      total: state.playlist.total
    }), 
    shallowEqual
  )
  
  // 切换分类时，重置当前页码
  useEffect(() => {
    setCurrentPage(1)
  }, [currentCategory])
  // 切换页码时，更新当前页的歌单
  useEffect(() => {
    setPlaylists(pages[currentPage - 1] || [])
  }, [pages, currentPage])

  // handles
  const dispatch = useAppDispatch()
  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    dispatch(fetchPlaylistsAsync(page - 1))
  }

  return (
    <PlaylistCoversWrapper>
      <div className='list'>
        {
          playlists.map(item => {
            return (
              <SongCover key={item.id} info={item} showSource={true}/>
            )
          })
        }
      </div>
      <JCPagination 
        total={total}
        current={currentPage} 
        onPageChange={handlePageChange}
      />
    </PlaylistCoversWrapper>
  )
}

export default memo(PlaylistCovers)