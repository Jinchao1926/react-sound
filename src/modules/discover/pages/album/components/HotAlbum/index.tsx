import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { shallowEqual } from 'react-redux'

import AlbumCover from '@/components/AlbumCover'
import SectionHeaderNormal from '@/components/SectionHeaderNormal'
import { useAppSelector } from '@/store'

import { HotAlbumWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HotAlbum: FC<IProps> = () => {
  const hotAlbums = useAppSelector(
    (state) => state.album.hotAlbums,
    shallowEqual
  )

  return (
    <HotAlbumWrapper>
      <SectionHeaderNormal title="热门新碟" />
      <div className="album-list">
        {hotAlbums.slice(0, 10).map((item) => {
          return <AlbumCover key={item.id} info={item} small={false} />
        })}
      </div>
    </HotAlbumWrapper>
  )
}

export default memo(HotAlbum)
