import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { PlaylistCovers } from './components/PlaylistCovers'
import { PlaylistHeader } from './components/PlaylistHeader'
import { useSelectedPlaylistCategory } from './hooks/useSelectedPlaylistCategory'
import { PlaylistWrapper } from './Playlist.styles'

export const Playlist: FC = () => {
  const { selectedCategory } = useSelectedPlaylistCategory()

  return (
    <>
      <Helmet>
        <title>全部歌单 - 歌单 - React Sound</title>
        <meta name="description" content="全部歌单" />
      </Helmet>
      <PlaylistWrapper>
        <PlaylistHeader category={selectedCategory} />
        <PlaylistCovers category={selectedCategory} />
      </PlaylistWrapper>
    </>
  )
}
