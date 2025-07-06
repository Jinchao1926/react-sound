import React, { FC } from 'react'

import { useTop3PlaylistsQuery } from '@/hooks/playlist/useTop3PlaylistsQuery'
import { SectionHeader } from '@/modules/Discover/components/SectionHeader'

import { Playlist } from './Playlist'
import { TopPlaylistContainer } from './TopPlaylists.styles'

// 榜单
export const TopPlaylists: FC = () => {
  const { data } = useTop3PlaylistsQuery()

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
