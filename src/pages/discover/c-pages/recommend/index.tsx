import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import Banner from './c-components/banner'
import HotAnchor from './c-components/hot-anchor'
import HotRecommend from './c-components/hot-recommend'
import NewAlbum from './c-components/new-album'
import RankingList from './c-components/ranking-list'
import ResidentSinger from './c-components/resident-singer'
import UserProfile from './c-components/user-profile'
import {
  fetchRecommendDataAsync,
  fetchRankingDataAsync,
  fetchSingerDataAsync,
} from './store'
import {
  RecommendWrapper,
  RecommendSection,
  RecommendLeft,
  RecommendRight,
} from './style'
import { useAppDispatch } from '@/store'

interface IProps {
  children?: ReactNode
}

// 推荐
const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendDataAsync())
    dispatch(fetchRankingDataAsync())
    dispatch(fetchSingerDataAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RecommendWrapper>
      <Banner />
      {/* <JCBanner /> */}
      <RecommendSection>
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RankingList />
        </RecommendLeft>
        <RecommendRight>
          <UserProfile />
          <ResidentSinger />
          <HotAnchor />
        </RecommendRight>
      </RecommendSection>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
