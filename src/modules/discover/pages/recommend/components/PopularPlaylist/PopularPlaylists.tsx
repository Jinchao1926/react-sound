import React, { FC, useMemo } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import SongCover from '@/components/SongCover'
import { usePopularPlaylistsQuery } from '@/hooks/recommend/usePopularPlaylistsQuery'

import { PopularPlaylistContainer } from './PopularPlaylists.styles'

// 热门推荐
export const PopularPlaylists: FC = () => {
  const keywords = useMemo(() => ['华语', '流行', '摇滚', '民谣', '电子'], [])
  const { data } = usePopularPlaylistsQuery()

  return (
    <div>
      <SectionHeader
        variant="primary"
        title="热门推荐"
        tags={keywords}
        moreHref="/discover/playlist"
      />
      <PopularPlaylistContainer>
        {data.map((item) => {
          return <SongCover key={item.id} info={item} />
        })}
      </PopularPlaylistContainer>
    </div>
  )
}
