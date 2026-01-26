import { useMemo, type FC } from 'react'

import { Flex } from '@/components/Core'
import { usePlayerContext } from '@/providers/PlayerProvider'

import {
  ClearPlaylist,
  ClosePlaylistButton,
  CollectPlaylist,
  CurrentTrackTitle,
  PlaylistHeader,
  PlaylistTitle,
  PlaylistWrapper,
  Separator,
} from './PlaylistPanel.styles'
import { PlaylistTracks } from './PlaylistTracks'
import { TrackLyrics } from './TrackLyrics'

export const PlaylistPanel: FC = () => {
  const {
    state: { playlist, currentTrack },
    clearPlaylist,
    closePlaylistPannel,
  } = usePlayerContext()

  const trackName = useMemo(() => {
    if (currentTrack) return currentTrack.name

    if (playlist.length > 0) return playlist[0].name

    return ''
  }, [currentTrack, playlist])

  return (
    <PlaylistWrapper>
      <PlaylistHeader>
        {/* Playlist */}
        <PlaylistTitle>播放列表({playlist.length})</PlaylistTitle>
        <CollectPlaylist />
        <Separator />
        <ClearPlaylist onClick={clearPlaylist} />

        {/* Current Track */}
        <CurrentTrackTitle>{trackName}</CurrentTrackTitle>
        <ClosePlaylistButton onClick={closePlaylistPannel} />
      </PlaylistHeader>

      <Flex>
        {/* Tracks */}
        <PlaylistTracks />
        <TrackLyrics />
      </Flex>
    </PlaylistWrapper>
  )
}
