import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Box, Flex, Head, Image, Sprite, TextNavLink } from '@/components/UI'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  CollectButton,
  PlayButton,
  PlaylistCover,
  PlaylistFooterWrapper,
  PlaylistLink,
  PlaylistSongListWrapper,
} from './Playlist.styles'

interface PlaylistProps {
  playlist: PlaylistDetail
}

export const Playlist: FC<PlaylistProps> = ({ playlist }) => {
  const { tracks = [] } = playlist
  const { playSong, addToPlaylist } = usePlayerContext()

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
      <PlaylistSongListWrapper>
        {tracks.slice(0, 10).map((song, index) => (
          <div className="item" key={song.id}>
            <span className="index">{index + 1}</span>
            <NavLink className="name no-wrap" to={`/song?id=${song.id}`}>
              {song.name}
            </NavLink>
            <div className="actions">
              <button
                className="sprite_02 btn play"
                title="播放"
                onClick={() => playSong(song)}
              />
              <button
                className="sprite_icon2 btn addTo"
                title="添加到播放列表"
                onClick={() => addToPlaylist(song)}
              />
              <button
                className="sprite_02 btn collect"
                title="收藏"
                onClick={() => collectMusic(song)}
              />
            </div>
          </div>
        ))}
      </PlaylistSongListWrapper>
      <PlaylistFooterWrapper>
        <NavLink to={rankingUrl}>{'查看全部>'}</NavLink>
      </PlaylistFooterWrapper>
    </Box>
  )
}
