import React, { FC, useState, useEffect, useMemo, useCallback } from 'react'

import { JCPagination } from '@/components/Pagination'
import { Box } from '@/components/UI'
import { useTopPlaylistsQuery } from '@/hooks/playlist/useTopPlaylistsQuery'
import { PlaylistCover } from '@/modules/Discover/components/PlaylistCover'

import { PlaylistCoverList } from './PlaylistCovers.styles'

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
    <Box mt={10}>
      <PlaylistCoverList>
        {playlists.map((item) => (
          <PlaylistCover key={item.id} playlist={item} />
        ))}
      </PlaylistCoverList>
      <JCPagination
        total={total}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}
