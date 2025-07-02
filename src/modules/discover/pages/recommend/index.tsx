import React, { FC, memo, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import Banner from './components/Banner'
import HotAnchor from './components/hot-anchor'
import HotRecommend from './components/hot-recommend'
import NewAlbum from './components/new-album'
import RankingList from './components/ranking-list'
import ResidentSinger from './components/resident-singer'
import UserProfile from './components/user-profile'
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

// 推荐
const Recommend: FC = () => {
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
