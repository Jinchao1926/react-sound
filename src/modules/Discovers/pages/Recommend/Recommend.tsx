import React, { FC } from 'react'

import { Banner } from './components/Banner'
import { NewAlbum } from './components/NewAlbum'
import { PopularAnchor } from './components/PopularAnchor'
import { PopularPlaylists } from './components/PopularPlaylist'
import { SignedArtist } from './components/SignedArtist'
import { TopPlaylists } from './components/TopPlaylists'
import { UserProfile } from './components/UserProfile'
import {
  RecommendSection,
  RecommendLeft,
  RecommendRight,
} from './Recommend.styles'

// 推荐
export const Recommend: FC = () => {
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
          <SignedArtist />
          <PopularAnchor />
        </RecommendRight>
      </RecommendSection>
    </div>
  )
}
