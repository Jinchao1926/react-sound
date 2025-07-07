import React, { FC, ElementRef, useRef } from 'react'

import { Carousel } from 'antd'

import { SectionHeader } from '@/components/SectionHeader'
import { useNewAlbumsQuery } from '@/hooks/album/useNewAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { NewAlbumWrapper } from './NewAlbum.styles'

// 新碟上架
export const NewAlbum: FC = () => {
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)

  const { data: albums } = useNewAlbumsQuery()

  return (
    <NewAlbumWrapper>
      <SectionHeader
        variant="primary"
        title="新碟上架"
        moreHref="/discover/album"
      />
      <div className="inner">
        <div
          className="arrow arrow-left sprite_02"
          onClick={() => pageRef.current?.prev()}
        />
        <Carousel
          className="album-list"
          ref={pageRef}
          dots={false}
          autoplay={false}
        >
          {[0, 1].map((idx) => {
            return (
              <div className="album-page" key={idx}>
                {albums.slice(idx * 5, (idx + 1) * 5).map((album) => {
                  return (
                    <AlbumCover key={album.id} album={album} isLarge={false} />
                  )
                })}
              </div>
            )
          })}
        </Carousel>
        <div
          className="arrow arrow-right sprite_02"
          onClick={() => pageRef.current?.next()}
        />
      </div>
    </NewAlbumWrapper>
  )
}
