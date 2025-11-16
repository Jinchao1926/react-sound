import { useMemo, type FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Box } from '@/components/UI'
import { useNewAlbumsQuery } from '@/hooks/album/useNewAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { AlbumList } from './NewAlbum.styles'

export const NewAlbum: FC = () => {
  const { data } = useNewAlbumsQuery()
  const albums = useMemo(() => data.slice(0, 10), [data])

  return (
    <Box>
      <SectionHeader title="热门新碟" />
      <AlbumList>
        {albums.map((item) => (
          <AlbumCover key={item.id} album={item} />
        ))}
      </AlbumList>
    </Box>
  )
}
