import React, { FC, useState, useEffect } from 'react'

import JCPagination from '@/components/Pagination'
import SongCover from '@/components/SongCover'
import { useTopPlaylistsQuery } from '@/hooks/playlist/useTopPlaylistsQuery'

import { PlaylistCoversWrapper } from './PlaylistCovers.styles'

export const PlaylistCovers: FC<{ category: string }> = ({ category }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 35
  const { data: playlists, total } = useTopPlaylistsQuery({
    category,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize,
  })

  // Reset current page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  return (
    <PlaylistCoversWrapper>
      <div className="list">
        {playlists.map((item) => {
          return <SongCover key={item.id} info={item} showSource={true} />
        })}
      </div>
      <JCPagination
        total={total}
        pageSize={35}
        current={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </PlaylistCoversWrapper>
  )
}
