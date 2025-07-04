import React, { FC } from 'react'

import { useTopPlaylistsQuery } from '@/hooks/playlist/useTopPlaylistsQuery'
import { SectionHeader } from '@/modules/Discover/components/SectionHeader'

import { Playlist } from './Playlist'
import { TopPlaylistContainer } from './TopPlaylists.styles'

// 榜单
export const TopPlaylists: FC = () => {
  const { data } = useTopPlaylistsQuery()

  return (
    <div>
      <SectionHeader title="榜单" morePath="/discover/toplist" />
      <TopPlaylistContainer>
        {data.map((playlist) => {
          return <Playlist key={playlist.id} playlist={playlist} />
        })}
      </TopPlaylistContainer>
    </div>
  )
}
