import React, { FC, useMemo } from 'react'

import SectionHeaderRecommend from '@/components/SectionHeaderRecommend'
import SongCover from '@/components/SongCover'
import { usePopularPlaylistsQuery } from '@/hooks/usePopularPlaylistsQuery'

import { PopularPlaylists } from './PopularPlaylist.styles'

// 热门推荐
export const PopularPlaylist: FC = () => {
  const keywords = useMemo(() => ['华语', '流行', '摇滚', '民谣', '电子'], [])
  const { data } = usePopularPlaylistsQuery()

  return (
    <div>
      <SectionHeaderRecommend
        title="热门推荐"
        keywords={keywords}
        morePath="/discover/playlist?cat="
      />
      <PopularPlaylists>
        {data.map((item) => {
          return <SongCover key={item.id} info={item} />
        })}
      </PopularPlaylists>
    </div>
  )
}
