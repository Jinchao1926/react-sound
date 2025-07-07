import { FC, useState, useMemo, useEffect } from 'react'

import JCPagination from '@/components/Pagination'
import { SectionHeader } from '@/components/SectionHeader'
import { areas } from '@/constants/region'
import { useAllAlbumsQuery } from '@/hooks/album/useAllAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { AllAlbumWrapper } from './AllAlbum.styles'
import { useSelectedArea } from '../../hooks/useSelectedArea'

const PAGE_SIZE = 35

export const AllAlbum: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const tagData = useMemo(
    () =>
      areas.map((item) => ({
        name: item.name,
        href: `/discover/album?area=${item.code}`,
      })),
    []
  )

  const { selectedArea } = useSelectedArea()
  useEffect(() => {
    setCurrentPage(1) // Reset to first page when area changes
  }, [selectedArea])

  const { data: albums, total } = useAllAlbumsQuery({
    area: selectedArea,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  return (
    <AllAlbumWrapper>
      <SectionHeader title="全部新碟" tags={tagData} />
      <div className="album-list">
        {albums.map((item) => {
          return <AlbumCover key={item.id} album={item} />
        })}
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
