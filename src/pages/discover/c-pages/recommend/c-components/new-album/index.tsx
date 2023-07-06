import React, { ElementRef, memo, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import { Carousel } from 'antd'
import {
  NewAlbumWrapper
} from './style'
import SectionHeaderRecommend from '@/components/section-header-recommend'
import AlbumCover from '@/components/album-cover'

interface IProps {
  children?: ReactNode
}

// 新碟上架
const NewAlbum: FC<IProps> = () => {
  const pageRef = useRef<ElementRef<typeof Carousel>>(null)
  // redux
  const { albums } = useAppSelector((state) => ({
      albums: state.recommend.newAlbums
    }),
    shallowEqual
  )
  
  return (
    <NewAlbumWrapper>
      <SectionHeaderRecommend title='新碟上架' morePath='/discover/album'/>
      <div className='inner'>
        <div className='arrow arrow-left sprite_02' onClick={e => pageRef.current?.prev()}/>
        <Carousel 
          className='album-list' 
          ref={pageRef} 
          dots={false} 
          autoplay={false}
        >
          {[0, 1].map(idx => {
            return (
              <div className='album-page' key={idx}>
                {albums.slice(idx * 5, (idx + 1) * 5).map(item => {
                  return <AlbumCover key={item.id} info={item} small={true}/>
                })}
              </div>
            )
          })}
        </Carousel>
        <div className='arrow arrow-right sprite_02' onClick={e => pageRef.current?.next()} />
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)