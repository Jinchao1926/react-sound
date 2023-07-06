import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import {
  HotRecommendWrapper
} from './style'
import SectionHeaderRecommend from '@/components/section-header-recommend'
import SongCover from '@/components/song-cover'

interface IProps {
  children?: ReactNode
}

// 热门推荐
const HotRecommend: FC<IProps> = () => {
  const [keywords] = useState(['华语', '流行', '摇滚', '民谣', '电子'])
  // 获取 redux 数据
  const { hotRecommends } = useAppSelector(state => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )

  return (
    <HotRecommendWrapper>
      <SectionHeaderRecommend 
        title='热门推荐' 
        keywords={keywords}
        morePath='/discover/playlist'
      />
      <div className='recommend-list'>
        {
          hotRecommends.map((item, index) => {
            return <SongCover key={item.id} info={item} />
          })
        }
      </div>
    </HotRecommendWrapper>
  )
}

export default memo(HotRecommend)