import type { FC } from 'react'

import { useSongSimilarPlaylistsQuery } from '@/hooks/song/useSongSimilarPlaylistsQuery'
import { RelatedPlaylists } from '@/modules/Detail/components/RelatedPlaylists'

export const SongSimilarPlaylist: FC<{ songId: number }> = ({ songId }) => {
  const { data } = useSongSimilarPlaylistsQuery(songId)
  return <RelatedPlaylists playlists={data} />
}
