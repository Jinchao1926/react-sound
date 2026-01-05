import { type FC } from 'react'

import { useRelatedPlaylistsQuery } from '@/hooks/playlist/useRelatedPlaylistsQuery'
import { RelatedPlaylists as Component } from '@/modules/Detail/components/RelatedPlaylists'

export const RelatedPlaylists: FC<{ playlistId: number }> = ({
  playlistId,
}) => {
  const { data } = useRelatedPlaylistsQuery(playlistId)

  return <Component playlists={data} title="相关推荐" />
}
