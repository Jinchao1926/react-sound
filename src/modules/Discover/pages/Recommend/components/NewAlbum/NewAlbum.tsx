import React, { FC, ElementRef, useRef, useMemo } from 'react'

import { Carousel } from 'antd'

import { SectionHeader } from '@/components/SectionHeader'
import { Box } from '@/components/UI'
import { useNewAlbumsQuery } from '@/hooks/album/useNewAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import {
  AlbumList,
  AlbumPage,
  Left,
  NewAlbumContent,
  Right,
} from './NewAlbum.styles'

// 新碟上架
export const NewAlbum: FC = () => {
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)

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
        titleHref="/discover/album"
        moreHref="/discover/album"
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
