import { FC, useCallback, useState } from 'react'

import JCPagination from '@/components/Pagination'
import { SectionHeader } from '@/components/SectionHeader'
import { areas } from '@/constants/region'
import { useAllAlbumsQuery } from '@/hooks/album/useAllAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { AllAlbumWrapper } from './AllAlbum.styles'

const PAGE_SIZE = 35

export const AllAlbum: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentArea] = useState<string>('ALL')
  const [areaNames] = useState<string[]>(areas.map((item) => item.name))

  const { data: albums, total } = useAllAlbumsQuery({
    area: currentArea,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // const handleSwitchArea = useCallback((areaName: string) => {
  //   const area = areas.find((item) => item.name === areaName)
  //   if (area) {
  //     setCurrentArea(area.code)
  //     setCurrentPage(1)
  //   }
  // }, [])

  return (
    <AllAlbumWrapper>
      <SectionHeader
        title="全部新碟"
        tags={areaNames}
        tagsHref="/discover/album?area="
      />
      <div className="album-list">
        {albums.map((item) => {
          return <AlbumCover key={item.id} album={item} />
        })}
      </div>
      <JCPagination
        total={total}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={handlePageChange}
      />
    </AllAlbumWrapper>
  )
}
