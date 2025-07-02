import React, { FC, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import Banner from './components/Banner'
import HotAnchor from './components/HotAnchor'
import NewAlbum from './components/NewAlbum'
import { PopularPlaylist } from './components/PopularPlaylist/PopularPlaylist'
import RankingList from './components/RankingList'
import ResidentSinger from './components/ResidentSinger'
import UserProfile from './components/UserProfile'
import {
  RecommendSection,
  RecommendLeft,
  RecommendRight,
} from './Recommend.styles'
import {
  // fetchRecommendDataAsync,
  fetchRankingDataAsync,
  fetchSingerDataAsync,
} from './store'

// 推荐
export const Recommend: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // dispatch(fetchRecommendDataAsync())
    dispatch(fetchRankingDataAsync())
    dispatch(fetchSingerDataAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Banner />
      {/* <JCBanner /> */}
      <RecommendSection>
        <RecommendLeft>
          <PopularPlaylist />
          <NewAlbum />
          <RankingList />
        </RecommendLeft>
        <RecommendRight>
          <UserProfile />
          <ResidentSinger />
          <HotAnchor />
        </RecommendRight>
      </RecommendSection>
    </div>
  )
}
