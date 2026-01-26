import { useMemo, useRef, type FC } from 'react'

import { UserLink } from '@/components/Links/UserLink'
import {
  ClearButton,
  CollectButton,
  DownloadButton,
  ShareButton,
} from '@/components/Shared/Playlist'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { formatMinuteSecond } from '@/utils/format/timeFormat'

import { PlaylistNoData } from '../PlaylistNoData'
import {
  PlaylistTrackTR,
  PlaylistTrackCol,
  PlaylistTrackTable,
  PlaylistTrackTableWrapper,
  PlaylistTrackTD,
  PlayingIcon,
  PlaylistTrackActions,
  TrackDivider,
} from './PlaylistTracks.styles'

export const PlaylistTracks: FC = () => {
  const {
    state: { playlist, currentTrack },
    removeFromPlaylist,
    playTrack,
  } = usePlayerContext()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const showScrollBar = useMemo(() => {
    const el = wrapperRef.current
    if (!el) return false

    return el.scrollHeight > el.clientHeight
  }, [])

  return (
    <PlaylistTrackTableWrapper ref={wrapperRef}>
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
              <PlaylistTrackTR key={track.id} onClick={() => playTrack(track)}>
                <td>
                  {currentTrack
                    ? track.id === currentTrack?.id
                    : index === 0 && <PlayingIcon />}
                </td>
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

      {!showScrollBar && <TrackDivider />}
    </PlaylistTrackTableWrapper>
  )
}
