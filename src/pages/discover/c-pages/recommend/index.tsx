import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

// Store
import { useAppDispatch } from '@/store'
import { 
  fetchRecommendDataAsync,
  fetchRankingDataAsync
} from './store'

// UIs
import { 
  RecommendWrapper,
  RecommendSection,
  RecommendLeft,
  RecommendRight
} from './style'
import Banner from './c-components/banner'
// import JCBanner from './c-components/jc-banner'
import UserProfile from './c-components/user-profile'
import HotRecommend from './c-components/hot-recommend'
import NewAlbum from './c-components/new-album'
import RankingList from './c-components/ranking-list'
import ResidentSinger from './c-components/resident-singer'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendDataAsync())
    dispatch(fetchRankingDataAsync())
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
        </RecommendRight>
      </RecommendSection>
    </RecommendWrapper>
  )
}

export default memo(Recommend)