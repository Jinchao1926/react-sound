import type React from 'react'
import { type FC } from 'react'

import { Flex } from '@/components/Core'
import { UserLink } from '@/components/Links'
import {
  ClearButton,
  CollectButton,
  DownloadButton,
  ShareButton,
} from '@/components/Shared/Playlist'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { formatMinuteSecond } from '@/utils/format/timeFormat'

import { PlaylistNoData } from './PlaylistNoData'
import {
  ClearPlaylist,
  ClosePlaylistButton,
  CollectPlaylist,
  CurrentTrackTitle,
  PlayingIcon,
  PlaylistHeader,
  PlaylistTitle,
  PlaylistTrackActions,
  PlaylistTrackCol,
  PlaylistTrackTable,
  PlaylistTrackTableWrapper,
  PlaylistTrackTD,
  PlaylistTrackTR,
  PlaylistWrapper,
  Separator,
} from './PlaylistPanel.styles'

export const PlaylistPanel: FC = () => {
  const {
    state: { playlist, currentTrack },
    removeFromPlaylist,
    clearPlaylist,
    closePlaylistPannel,
    playTrack,
  } = usePlayerContext()

  return (
    <PlaylistWrapper>
      <PlaylistHeader>
        {/* Playlist */}
        <PlaylistTitle>播放列表({playlist.length})</PlaylistTitle>
        <CollectPlaylist />
        <Separator />
        <ClearPlaylist onClick={clearPlaylist} />

        {/* Current Track */}
        <CurrentTrackTitle>{currentTrack?.name || ''}</CurrentTrackTitle>
        <ClosePlaylistButton onClick={closePlaylistPannel} />
      </PlaylistHeader>

      <Flex>
        {/* Tracks */}
        <PlaylistTrackTableWrapper>
          {playlist.length > 0 ? (
            <PlaylistTrackTable>
              <colgroup>
                <PlaylistTrackCol width={20} />
                <PlaylistTrackCol />
                <PlaylistTrackCol width={88} />
                <PlaylistTrackCol width={80} />
                <PlaylistTrackCol width={45} />
                <PlaylistTrackCol width={43} />
              </colgroup>
              <tbody>
                {playlist.map((track, index) => (
                  <PlaylistTrackTR
                    key={track.id}
                    onClick={() => playTrack(track)}
                  >
                    <td>{track.id === currentTrack?.id && <PlayingIcon />}</td>
                    <PlaylistTrackTD>{track.name}</PlaylistTrackTD>
                    {/* Actions */}
                    <td>
                      <PlaylistTrackActions>
                        <CollectButton />
                        <ShareButton />
                        <DownloadButton />
                        <ClearButton
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            removeFromPlaylist(track.id)
                          }}
                        />
                      </PlaylistTrackActions>
                    </td>
                    {/* Artist */}
                    <PlaylistTrackTD>
                      <UserLink users={track.ar} block color="#9b9b9b" />
                    </PlaylistTrackTD>
                    {/* Duration */}
                    <PlaylistTrackTD color="#666">
                      {formatMinuteSecond(track.dt)}
                    </PlaylistTrackTD>
                    <td />
                  </PlaylistTrackTR>
                ))}
              </tbody>
            </PlaylistTrackTable>
          ) : (
            <PlaylistNoData />
          )}
        </PlaylistTrackTableWrapper>
      </Flex>
    </PlaylistWrapper>
  )
}
