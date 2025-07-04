import { FC, useCallback, useEffect, useState } from 'react'

import { shallowEqual } from 'react-redux'

import JCPagination from '@/components/Pagination'
import SectionHeaderNormal from '@/components/SectionHeaderNormal'
import { areas } from '@/constants/region'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'
import { useAppDispatch, useAppSelector } from '@/store'

import { AllAlbumWrapper } from './style'
import { changeCurrentAreaAsync, fetchAllAlbumsAsync } from '../../store'

export const AllAlbum: FC = () => {
  // state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [albums, setAlbums] = useState<any[]>([])
  const [areaNames] = useState<string[]>(areas.map((item) => item.name))
  // redux
  const { pageAlbums, total, currentArea } = useAppSelector(
    (state) => ({
      pageAlbums: state.album.pageAlbums,
      total: state.album.total,
      currentArea: state.album.currentArea,
    }),
    shallowEqual
  )

  // 切换地区时，重置当前页码
  useEffect(() => {
    setCurrentPage(1)
  }, [currentArea])
  // 切换页码时，更新当前页的新碟
  useEffect(() => {
    setAlbums(pageAlbums[currentPage - 1] || [])
  }, [pageAlbums, currentPage])

  // handles
  const dispatch = useAppDispatch()
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)

      dispatch(fetchAllAlbumsAsync(page - 1))
    },
    [dispatch]
  )

  const handleSwitchArea = useCallback(
    (area: string) => {
      dispatch(changeCurrentAreaAsync(area))
      dispatch(fetchAllAlbumsAsync(currentPage - 1))
    },
    [dispatch, currentPage]
  )

  return (
    <AllAlbumWrapper>
      <SectionHeaderNormal
        title="全部新碟"
        keywords={areaNames}
        onKeywordClick={handleSwitchArea}
      />
      <div className="album-list">
        {albums.map((item) => {
          return <AlbumCover key={item.id} album={item} />
        })}
      </div>
      <JCPagination
        total={total}
        pageSize={35}
        current={currentPage}
        onPageChange={handlePageChange}
      />
    </AllAlbumWrapper>
  )
}
