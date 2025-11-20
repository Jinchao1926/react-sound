import type { FC } from 'react'

import { useSongPlaylistsQuery } from '@/hooks/song/useSongPlaylistsQuery'
import { RelatedPlaylists } from '@/modules/Detail/components/RelatedPlaylists'

export const SongPlaylist: FC<{ songId: number }> = ({ songId }) => {
  const { data } = useSongPlaylistsQuery(songId)

  return <RelatedPlaylists playlists={data} />
}
