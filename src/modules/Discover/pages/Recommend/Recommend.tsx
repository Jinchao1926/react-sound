import { type FC } from 'react'

import { Box } from '@/components/Core'

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
    <Box>
      <Banner />
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
    </Box>
  )
}
