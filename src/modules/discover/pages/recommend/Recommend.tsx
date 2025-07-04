import React, { FC, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import { Banner } from './components/Banner/Banner'
import HotAnchor from './components/HotAnchor'
import { NewAlbum } from './components/NewAlbum/NewAlbum'
import { PopularPlaylists } from './components/PopularPlaylist/PopularPlaylists'
import ResidentSinger from './components/ResidentSinger'
import { TopPlaylists } from './components/TopPlaylists/TopPlaylists'
import UserProfile from './components/UserProfile'
import {
  RecommendSection,
  RecommendLeft,
  RecommendRight,
} from './Recommend.styles'
import {
  // fetchRecommendDataAsync,
  // fetchRankingDataAsync,
  fetchSingerDataAsync,
} from './store'

// 推荐
export const Recommend: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // dispatch(fetchRecommendDataAsync())
    // dispatch(fetchRankingDataAsync())
    dispatch(fetchSingerDataAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Banner />
      {/* <JCBanner /> */}
      <RecommendSection>
        <RecommendLeft>
          <PopularPlaylists />
          <NewAlbum />
          <TopPlaylists />
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
