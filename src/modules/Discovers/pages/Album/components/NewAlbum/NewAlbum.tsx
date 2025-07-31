import type { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { useNewAlbumsQuery } from '@/hooks/album/useNewAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { NewAlbumWrapper } from './NewAlbum.styles'

export const NewAlbum: FC = () => {
  const { data } = useNewAlbumsQuery()

  return (
    <NewAlbumWrapper>
      <SectionHeader title="热门新碟" />
      <div className="album-list">
        {data.slice(0, 10).map((item) => (
          <AlbumCover key={item.id} album={item} />
        ))}
      </div>
    </NewAlbumWrapper>
  )
}
