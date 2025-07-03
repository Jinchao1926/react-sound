import React, { FC, ElementRef, useRef } from 'react'

import { Carousel } from 'antd'

import SectionHeaderRecommend from '@/components/SectionHeaderRecommend'
import { useNewAlbumsQuery } from '@/hooks/useNewAlbumsQuery'
import { AlbumCover } from '@/modules/Discover/components/AlbumCover'

import { NewAlbumWrapper } from './NewAlbum.styles'

// 新碟上架
export const NewAlbum: FC = () => {
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)

  const { data: albums } = useNewAlbumsQuery()

  return (
    <NewAlbumWrapper>
      <SectionHeaderRecommend title="新碟上架" morePath="/discover/album" />
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
                {albums.slice(idx * 5, (idx + 1) * 5).map((item) => {
                  return <AlbumCover key={item.id} album={item} />
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
