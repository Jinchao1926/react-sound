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
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/dataFormat'

import { SongActions, SongIndex, SongItem } from './Playlist.styles'

interface PlaylistProps {
  playlist: PlaylistDetail
}

export const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const { tracks = [] } = playlist
  const { playSong, addToPlaylist } = usePlayerContext()

  const top10Tracks = useMemo(() => {
    return tracks.slice(0, 10)
  }, [tracks])

  const rankingUrl = `/discover/toplist?id=${playlist.id}`

  // eslint-disable-next-line no-unused-vars
  const collectMusic = (item: any) => {}

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
            <PlayButton onClick={() => {}} />
            <CollectButton onClick={() => {}} />
          </Flex>
        </Box>
      </Flex>

      <Box>
        {top10Tracks.map((song, index) => (
          <SongItem key={song.id}>
            <SongIndex>{index + 1}</SongIndex>
            <TextNavLink
              to={`/song?id=${song.id}`}
              color="#000"
              width={170}
              flex={1}
              nowrap
            >
              {song.name}
            </TextNavLink>

            <SongActions>
              <PlayButtonSM onClick={() => playSong(song)} />
              <AddToButtonSM onClick={() => addToPlaylist(song)} />
              <CollectButtonSM onClick={() => collectMusic(song)} />
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
