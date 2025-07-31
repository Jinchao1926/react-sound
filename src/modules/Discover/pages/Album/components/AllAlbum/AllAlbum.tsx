import { FC, useState, useEffect } from 'react'

import { JCPagination } from '@/components/Pagination'
import { SectionHeader } from '@/components/SectionHeader'
import { useAllAlbumsQuery } from '@/hooks/album/useAllAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { AllAlbumWrapper } from './AllAlbum.styles'
import { useAreas, useSelectedArea } from '../../hooks'

const PAGE_SIZE = 35

export const AllAlbum: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { areaTags } = useAreas()
  const { selectedArea } = useSelectedArea()
  const { data: albums, total } = useAllAlbumsQuery({
    area: selectedArea,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedArea])

  return (
    <AllAlbumWrapper>
      <SectionHeader title="全部新碟" tags={areaTags} />
      <div className="album-list">
        {albums.map((item) => (
          <AlbumCover key={item.id} album={item} />
        ))}
      </div>
      <JCPagination
        total={total}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </AllAlbumWrapper>
  )
}
