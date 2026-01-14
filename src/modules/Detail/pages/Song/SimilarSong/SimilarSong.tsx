import type { FC } from 'react'

import { Box, Flex, TextNavLink } from '@/components/Core'
import { UserLink } from '@/components/Links'
import { SectionHeader } from '@/components/SectionHeader'
import { AddToButtonXS, PlayButtonXS } from '@/components/Shared/Media'
import { useSimilarSongsQuery } from '@/hooks/song/useSimilarSongsQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { songToTrack } from '@/utils/track/trackConverter'

import { SimilarSongItem } from './SimilarSong.styles'

export const SimilarSong: FC<{ songId: number }> = ({ songId }) => {
  const { data: songs } = useSimilarSongsQuery(songId)
  const { playSong, addToPlaylist } = usePlayerContext()

  return (
    <Box mb={25}>
      <SectionHeader variant="simple" title="相似歌曲" />
      <Box mt={20}>
        {songs.map((song) => (
          <SimilarSongItem key={song.id}>
            <Box width={156} lineHeight={16}>
              <TextNavLink to={routeBuilder.song(song.id)} color="#333" nowrap>
                {song.name}
              </TextNavLink>
              <UserLink users={song.artists} block color="#999" />
            </Box>

            <Flex justify="space-between" width={36}>
              <PlayButtonXS onClick={() => playSong(songToTrack(song))} />
              <AddToButtonXS onClick={() => addToPlaylist(songToTrack(song))} />
            </Flex>
          </SimilarSongItem>
        ))}
      </Box>
    </Box>
  )
}
