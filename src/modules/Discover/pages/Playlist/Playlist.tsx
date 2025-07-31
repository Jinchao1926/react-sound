import React, { FC } from 'react'

import { PlaylistCovers } from './components/PlaylistCovers'
import { PlaylistHeader } from './components/PlaylistHeader'
import { useSelectedPlaylistCategory } from './hooks/useSelectedPlaylistCategory'
import { PlaylistWrapper } from './Playlist.styles'

export const Playlist: FC = () => {
  const { selectedCategory } = useSelectedPlaylistCategory()

  return (
    <PlaylistWrapper>
      <div className="content wrap-v2">
        <PlaylistHeader category={selectedCategory} />
        <PlaylistCovers category={selectedCategory} />
      </div>
    </PlaylistWrapper>
  )
}
