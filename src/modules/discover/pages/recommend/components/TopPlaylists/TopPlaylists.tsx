import React, { FC } from 'react'

import SectionHeaderRecommend from '@/components/SectionHeaderRecommend'
import { useTopPlaylistsQuery } from '@/hooks/useTopPlaylistsQuery'

import { Playlist } from './Playlist'
import { TopPlaylistContainer } from './TopPlaylists.styles'

// 榜单
export const TopPlaylists: FC = () => {
  const { data } = useTopPlaylistsQuery()

  return (
    <div>
      <SectionHeaderRecommend title="榜单" morePath="/discover/toplist" />
      <TopPlaylistContainer>
        {data.map((playlist) => {
          return <Playlist key={playlist.id} playlist={playlist} />
        })}
      </TopPlaylistContainer>
    </div>
  )
}
