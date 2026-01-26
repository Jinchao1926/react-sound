import { useMemo, type FC } from 'react'

import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'

import {
  TrackLyric,
  TrackLyricsContent,
  TrackLyricsWrapper,
} from './TrackLyrics.styles'

export const TrackLyrics: FC = () => {
  const {
    state: { currentTrack, currentLyricLineIndex, playlist },
  } = usePlayerContext()

  const track = useMemo(() => {
    if (currentTrack) return currentTrack

    if (playlist.length > 0) return playlist[0]

    return undefined
  }, [currentTrack, playlist])

  const { data: lyric } = useSongLyricQuery(track?.id)

  return (
    <TrackLyricsWrapper>
      <TrackLyricsContent>
        {lyric.map((item, idx) => (
          <TrackLyric key={item.time} highlight={currentLyricLineIndex === idx}>
            {item.text}
          </TrackLyric>
        ))}
      </TrackLyricsContent>
    </TrackLyricsWrapper>
  )
}
