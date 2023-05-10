import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import {
  HotRecommendWrapper
} from './style'
import SectionHeaderRCM from '@/components/section-header-rcm'
import SongCover from '@/components/song-cover'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  // 获取 redux 数据
  const { hotRecommends } = useAppSelector(state => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )

  const keywords = ['华语', '流行', '摇滚', '民谣', '电子']
  return (
    <HotRecommendWrapper>
      <SectionHeaderRCM 
        title='更多推荐' 
        keywords={keywords}
        morePath='/discover/songs'
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