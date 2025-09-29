import React, { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { useTop3PlaylistsQuery } from '@/hooks/recommend/useTop3PlaylistsQuery'

import { Playlist } from './Playlist'
import { TopPlaylistContainer } from './TopPlaylists.styles'

// 榜单
export const TopPlaylists: FC = () => {
  const { data } = useTop3PlaylistsQuery()

  return (
    <div>
      <SectionHeader
        variant="primary"
        title="榜单"
        titleHref="/discover/toplist"
        moreHref="/discover/toplist"
      />
      <TopPlaylistContainer>
        {data.map((playlist) => {
          return <Playlist key={playlist.id} playlist={playlist} />
        })}
      </TopPlaylistContainer>
    </div>
  )
}
