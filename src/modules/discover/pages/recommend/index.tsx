import React, { FC, memo, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import Banner from './components/Banner'
import HotAnchor from './components/HotAnchor'
import HotRecommend from './components/HotRecommend'
import NewAlbum from './components/NewAlbum'
import RankingList from './components/RankingList'
import ResidentSinger from './components/ResidentSinger'
import UserProfile from './components/UserProfile'
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
