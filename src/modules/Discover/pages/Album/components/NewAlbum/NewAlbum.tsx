import { useMemo, type FC } from 'react'

import { Box } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'
import { useNewAlbumsQuery } from '@/hooks/album/useNewAlbumsQuery'
import { usePlayAlbum } from '@/hooks/player/usePlayAlbum'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { AlbumList } from './NewAlbum.styles'

export const NewAlbum: FC = () => {
  const { data } = useNewAlbumsQuery()
  const albums = useMemo(() => data.slice(0, 10), [data])

  const { play } = usePlayAlbum()

  return (
    <Box>
      <SectionHeader title="热门新碟" />
      <AlbumList>
        {albums.map((item) => (
          <AlbumCover key={item.id} album={item} onPlay={() => play(item.id)} />
        ))}
      </AlbumList>
    </Box>
  )
}
