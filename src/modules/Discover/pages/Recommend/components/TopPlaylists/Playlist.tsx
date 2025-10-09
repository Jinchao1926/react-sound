import { useMemo, type FC } from 'react'

import { Box, Flex, Head, Image, Sprite, TextNavLink } from '@/components/UI'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  CollectButton,
  PlayButton,
  PlaylistCover,
  PlaylistLink,
  SongActions,
  SongAddToButton,
  SongCollectButton,
  SongIndex,
  SongItem,
  SongPlayButton,
} from './Playlist.styles'

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
        <PlaylistCover>
          <Image
            src={formatSizedImage(playlist.coverImgUrl, 80)}
            alt={playlist.name}
            width={'100%'}
            height={'100%'}
          />
          <PlaylistLink to={rankingUrl}>
            <Sprite sprite="cover" icon="bright" height={'100%'} />
          </PlaylistLink>
        </PlaylistCover>
        <Box>
          <TextNavLink to={rankingUrl} color="#333">
            <Head mt={6} mb={10} height={20}>
              {playlist.name}
            </Head>
          </TextNavLink>
          <Flex gap={10}>
            <PlayButton title="播放" onClick={() => {}} />
            <CollectButton title="收藏" onClick={() => {}} />
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
              noWrap
            >
              {song.name}
            </TextNavLink>

            <SongActions>
              <SongPlayButton title="播放" onClick={() => playSong(song)} />
              <SongAddToButton
                title="添加到播放列表"
                onClick={() => addToPlaylist(song)}
              />
              <SongCollectButton
                title="收藏"
                onClick={() => collectMusic(song)}
              />
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
