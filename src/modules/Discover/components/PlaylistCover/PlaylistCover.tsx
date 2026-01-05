import type { FC } from 'react'

import { Box, Flex, Text } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { IdentityIcon } from '@/components/IdentityIcon'
import { routeBuilder } from '@/routers'
import { type PlaylistDetail, type PopularPlaylist } from '@/types/playlist'
import { formatPlayCount, formatSizedImage } from '@/utils/dataFormat'

import {
  HeadsetIcon,
  PlayButton,
  PlaylistCoverPanel,
  PlaylistCreatorLink,
  PlaylistNameLink,
} from './PlaylistCover.styles'

export const PlaylistCover: FC<{
  playlist: PlaylistDetail | PopularPlaylist
}> = ({ playlist }) => {
  const getImageUrl = () => {
    if ('coverImgUrl' in playlist) return playlist.coverImgUrl
    return playlist.picUrl
  }

  const hasCreator = 'creator' in playlist && playlist.creator !== undefined

  const renderCreator = () => {
    if (!hasCreator) return null

    const { creator } = playlist as PlaylistDetail

    return (
      <Flex gap={4} maxWidth={140} color="#999">
        by
        <PlaylistCreatorLink to={routeBuilder.user(creator.userId)}>
          {creator.nickname}
        </PlaylistCreatorLink>
        <IdentityIcon avatarDetail={creator.avatarDetail} />
      </Flex>
    )
  }

  return (
    <Box className="playlist-cover" mt={20} mb={10} width={140}>
      <CoverImage
        src={formatSizedImage(getImageUrl(), 140)}
        alt={playlist.name}
        to={routeBuilder.playlist(playlist.id)}
        size={140}
        coverSprite="cover"
        coverIcon="bright140"
      >
        <PlaylistCoverPanel>
          <Flex align="center" gap={5}>
            <HeadsetIcon />
            <Text>{formatPlayCount(playlist.playCount)}</Text>
          </Flex>
          <PlayButton />
        </PlaylistCoverPanel>
      </CoverImage>

      <PlaylistNameLink
        to={routeBuilder.playlist(playlist.id)}
        nowrap={hasCreator}
      >
        {playlist.name}
      </PlaylistNameLink>

      {renderCreator()}
    </Box>
  )
}
