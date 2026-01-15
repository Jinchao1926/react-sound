import { useMemo, type FC } from 'react'

import { Box, Flex, Head, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import {
  AddToButtonSM,
  CollectButton,
  CollectButtonSM,
  PlayButton,
  PlayButtonSM,
} from '@/components/Shared/Media'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { type PlaylistDetail } from '@/types/playlist'
import { type Track } from '@/types/track'
import { formatSizedImage } from '@/utils/format/dataFormat'

import { SongActions, SongIndex, SongItem } from './Playlist.styles'

interface PlaylistProps {
  playlist: PlaylistDetail
}

export const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const { tracks = [] } = playlist
  const { playTrack, addToPlaylist, playTracks } = usePlayerContext()

  const top10Tracks = useMemo(() => {
    return tracks.slice(0, 10)
  }, [tracks])

  const rankingUrl = routeBuilder.discoverToplist(playlist.id)

  const collectTrack = (item: Track) => {}

  return (
    <Box width={230}>
      <Flex gap={10} height={100} pt={20} pl={19}>
        <CoverImage
          src={formatSizedImage(playlist.coverImgUrl, 80)}
          to={rankingUrl}
          size={80}
          coverSprite="cover"
          coverIcon="bright80"
        />
        <Box>
          <TextNavLink to={rankingUrl} color="#333">
            <Head mt={6} mb={10} height={20}>
              {playlist.name}
            </Head>
          </TextNavLink>
          <Flex gap={10}>
            <PlayButton onClick={() => playTracks(top10Tracks)} />
            <CollectButton onClick={() => {}} />
          </Flex>
        </Box>
      </Flex>

      <Box>
        {top10Tracks.map((song, index) => (
          <SongItem key={song.id}>
            <SongIndex>{index + 1}</SongIndex>
            <TextNavLink
              to={routeBuilder.song(song.id)}
              color="#000"
              mr={10}
              flex={1}
              nowrap
            >
              {song.name}
            </TextNavLink>

            <SongActions>
              <PlayButtonSM onClick={() => playTrack(song)} />
              <AddToButtonSM onClick={() => addToPlaylist(song)} />
              <CollectButtonSM onClick={() => collectTrack(song)} />
            </SongActions>
          </SongItem>
        ))}
      </Box>

      <Flex justify="flex-end" align="center" height={32} pr={32}>
        <TextNavLink to={rankingUrl} color="#000">
          {'查看全部>'}
        </TextNavLink>
      </Flex>
    </Box>
  )
}
