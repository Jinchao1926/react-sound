import { type FC } from 'react'

import { Box } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'
import { useTop3PlaylistsQuery } from '@/hooks/recommend/useTop3PlaylistsQuery'
import { routeBuilder } from '@/routers'

import { Playlist } from './Playlist'
import { TopPlaylistContainer } from './TopPlaylists.styles'

// 榜单
export const TopPlaylists: FC = () => {
  const { data } = useTop3PlaylistsQuery()

  return (
    <Box>
      <SectionHeader
        variant="primary"
        title="榜单"
        titleHref={routeBuilder.discoverToplist()}
        moreHref={routeBuilder.discoverToplist()}
      />
      <TopPlaylistContainer>
        {data.map((playlist) => {
          return <Playlist key={playlist.id} playlist={playlist} />
        })}
      </TopPlaylistContainer>
    </Box>
  )
}
