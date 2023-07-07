import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import { HotAlbumWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'
import AlbumCover from '@/components/album-cover'

interface IProps {
  children?: ReactNode
}

const HotAlbum: FC<IProps> = () => {
  const hotAlbums = useAppSelector(
    state => state.recommend.newAlbums, 
    shallowEqual
  )

  return (
    <HotAlbumWrapper>
      <SectionHeaderNormal title='热门新碟'/>
      <div className='album-list'>
        {
          hotAlbums.slice(0, 10).map(item => {
            return (
              <AlbumCover key={item.id} 
                info={item} 
                small={false}
              />
            )
          })
        }
      </div>
    </HotAlbumWrapper>
  )
}

export default memo(HotAlbum)