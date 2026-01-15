import { type FC, useMemo } from 'react'

import { Box } from '@/components/Core'
import { SectionHeader } from '@/components/SectionHeader'
import { usePlayPlaylist } from '@/hooks/player/usePlayPlaylist'
import { usePopularPlaylistsQuery } from '@/hooks/recommend/usePopularPlaylistsQuery'
import { PlaylistCover } from '@/modules/Discover/components/PlaylistCover'
import { routeBuilder } from '@/routers'

import { PopularPlaylistContainer } from './PopularPlaylists.styles'

// 热门推荐
export const PopularPlaylists: FC = () => {
  const tags = useMemo(() => ['华语', '流行', '摇滚', '民谣', '电子'], [])
  const { data } = usePopularPlaylistsQuery()

  const { play } = usePlayPlaylist()

  return (
    <Box>
      <SectionHeader
        variant="primary"
        title="热门推荐"
        titleHref={routeBuilder.discoverPlaylist()}
        tags={tags}
        tagsHref={routeBuilder.discoverPlaylist('')}
        moreHref={routeBuilder.discoverPlaylist()}
      />
      <PopularPlaylistContainer>
        {data.map((item) => (
          <PlaylistCover
            key={item.id}
            playlist={item}
            onPlay={() => play(item.id)}
          />
        ))}
      </PopularPlaylistContainer>
    </Box>
  )
}
