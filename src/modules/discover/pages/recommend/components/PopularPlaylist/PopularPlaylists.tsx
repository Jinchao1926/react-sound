import React, { FC, useMemo } from 'react'

import SectionHeaderRecommend from '@/components/SectionHeaderRecommend'
import SongCover from '@/components/SongCover'
import { usePopularPlaylistsQuery } from '@/hooks/usePopularPlaylistsQuery'

import { PopularPlaylistContainer } from './PopularPlaylists.styles'

// 热门推荐
export const PopularPlaylists: FC = () => {
  const keywords = useMemo(() => ['华语', '流行', '摇滚', '民谣', '电子'], [])
  const { data } = usePopularPlaylistsQuery()

  return (
    <div>
      <SectionHeaderRecommend
        title="热门推荐"
        keywords={keywords}
        morePath="/discover/playlist?cat="
      />
      <PopularPlaylistContainer>
        {data.map((item) => {
          return <SongCover key={item.id} info={item} />
        })}
      </PopularPlaylistContainer>
    </div>
  )
}
