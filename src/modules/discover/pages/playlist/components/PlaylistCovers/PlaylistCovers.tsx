import React, { FC, useState, useEffect, useMemo, useCallback } from 'react'

import JCPagination from '@/components/Pagination'
import SongCover from '@/components/SongCover'
import { useTopPlaylistsQuery } from '@/hooks/playlist/useTopPlaylistsQuery'

import { PlaylistCoversWrapper } from './PlaylistCovers.styles'

const PAGE_SIZE = 35

export const PlaylistCovers: FC<{ category: string }> = ({ category }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const queryOptions = useMemo(
    () => ({
      category,
      offset: (currentPage - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
    }),
    [category, currentPage]
  )

  const { data: playlists, total } = useTopPlaylistsQuery(queryOptions)

  // Reset current page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return (
    <PlaylistCoversWrapper>
      <div className="list">
        {playlists.map((item) => {
          return <SongCover key={item.id} info={item} showSource={true} />
        })}
      </div>
      <JCPagination
        total={total}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={handlePageChange}
      />
    </PlaylistCoversWrapper>
  )
}
