import { type FC } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'

import {
  ClearPlaylist,
  ClosePlaylistButton,
  CollectPlaylist,
  CurrentTrackTitle,
  PlaylistContent,
  PlaylistHeader,
  PlaylistTitle,
  PlaylistTracks,
  PlaylistWrapper,
  Separator,
} from './Playlist.styles'

export const Playlist: FC = () => {
  const {
    state: { playlist, currentTrack },
  } = usePlayerContext()

  return (
    <PlaylistWrapper>
      <PlaylistHeader>
        {/* Playlist */}
        <PlaylistTitle>播放列表({playlist.length})</PlaylistTitle>
        <CollectPlaylist />
        <Separator />
        <ClearPlaylist />

        {/* Track */}
        <CurrentTrackTitle>{currentTrack?.name || ''}</CurrentTrackTitle>
        <ClosePlaylistButton />
      </PlaylistHeader>
      <PlaylistContent>
        <PlaylistTracks />
      </PlaylistContent>
    </PlaylistWrapper>
  )
}
