import { type FC, useRef, useMemo } from 'react'

import { type CarouselRef } from '@/components/Carousel'
import { Box } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'
import { useNewAlbumsQuery } from '@/hooks/album/useNewAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'
import { routeBuilder } from '@/routers'

import {
  AlbumList,
  AlbumPage,
  Left,
  NewAlbumContent,
  Right,
} from './NewAlbum.styles'

// 新碟上架
export const NewAlbum: FC = () => {
  const pageRef = useRef<CarouselRef>(null)

  const { data: albums } = useNewAlbumsQuery()
  const albumPage = useMemo(() => {
    return Array.from({ length: 2 }, (_, idx) =>
      albums.slice(idx * 5, (idx + 1) * 5)
    )
  }, [albums])

  return (
    <Box>
      <SectionHeader
        variant="primary"
        title="新碟上架"
        titleHref={routeBuilder.discoverAlbum()}
        moreHref={routeBuilder.discoverAlbum()}
      />
      <NewAlbumContent>
        <Left onClick={() => pageRef.current?.prev()} />
        <AlbumList ref={pageRef} dots={false} autoplay={false}>
          {albumPage.map((page, idx) => (
            <AlbumPage key={idx}>
              {page.map((album) => (
                <AlbumCover key={album.id} album={album} isLarge={false} />
              ))}
            </AlbumPage>
          ))}
        </AlbumList>
        <Right onClick={() => pageRef.current?.next()} />
      </NewAlbumContent>
    </Box>
  )
}
