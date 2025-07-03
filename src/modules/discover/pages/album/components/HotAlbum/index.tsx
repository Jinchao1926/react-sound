import type { FC } from 'react'

import { shallowEqual } from 'react-redux'

import SectionHeaderNormal from '@/components/SectionHeaderNormal'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'
import { useAppSelector } from '@/store'

import { HotAlbumWrapper } from './style'

export const HotAlbum: FC = () => {
  const hotAlbums = useAppSelector(
    (state) => state.album.hotAlbums,
    shallowEqual
  )

  return (
    <HotAlbumWrapper>
      <SectionHeaderNormal title="热门新碟" />
      <div className="album-list">
        {hotAlbums.slice(0, 10).map((item) => {
          return <AlbumCover key={item.id} album={item} />
        })}
      </div>
    </HotAlbumWrapper>
  )
}
