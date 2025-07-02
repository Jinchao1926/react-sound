import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'

import RankingColumn from '@/components/ranking-column'
import SectionHeaderRecommend from '@/components/section-header-recommend'
import { useAppSelector } from '@/store'

import { RankingListWrapper } from './style'

interface IProps {
  children?: ReactNode
}

// 榜单
const RankingList: FC<IProps> = () => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings,
    }),
    shallowEqual
  )

  return (
    <RankingListWrapper>
      <SectionHeaderRecommend title="榜单" morePath="/discover/ranking" />
      <div className="ranking-list">
        {rankings.map((item) => {
          return <RankingColumn key={item.id} info={item} />
        })}
      </div>
    </RankingListWrapper>
  )
}

export default memo(RankingList)
