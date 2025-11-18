import React, { FC, useMemo } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Box } from '@/components/UI'
import { usePopularPlaylistsQuery } from '@/hooks/recommend/usePopularPlaylistsQuery'
import { PlaylistCover } from '@/modules/Discover/components/PlaylistCover'

import { PopularPlaylistContainer } from './PopularPlaylists.styles'

// 热门推荐
export const PopularPlaylists: FC = () => {
  const tags = useMemo(() => ['华语', '流行', '摇滚', '民谣', '电子'], [])
  const { data } = usePopularPlaylistsQuery()

  return (
    <Box>
      <SectionHeader
        variant="primary"
        title="热门推荐"
        titleHref="/discover/playlist"
        tags={tags}
        tagsHref="/discover/playlist?cat="
        moreHref="/discover/playlist"
      />
      <PopularPlaylistContainer>
        {data.map((item) => (
          <PlaylistCover key={item.id} playlist={item} />
        ))}
      </PopularPlaylistContainer>
    </Box>
  )
}
