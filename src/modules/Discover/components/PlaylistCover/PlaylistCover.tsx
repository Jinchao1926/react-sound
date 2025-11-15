import type { FC } from 'react'

import { CSSProperties } from 'styled-components'

import { CoverImage } from '@/components/CoverImage'
import { Box, Flex, Image, Text } from '@/components/UI'
import { PlaylistDetail, PopularPlaylist } from '@/types/playlist'
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
  style?: CSSProperties
}> = ({ playlist, style }) => {
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
        <PlaylistCreatorLink to={`/user/home/id=${creator.userId}`}>
          {creator.nickname}
        </PlaylistCreatorLink>
        {creator.avatarDetail && (
          <Image
            src={creator.avatarDetail.identityIconUrl}
            alt=""
            width={13}
            height={13}
          />
        )}
      </Flex>
    )
  }

  return (
    <Box mt={20} mb={10} width={140} style={style}>
      <CoverImage
        src={formatSizedImage(getImageUrl(), 140)}
        alt={playlist.name}
        to={`/playlist?id=${playlist.id}`}
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

      <PlaylistNameLink to={`/playlist?id=${playlist.id}`} nowrap={hasCreator}>
        {playlist.name}
      </PlaylistNameLink>

      {renderCreator()}
    </Box>
  )
}
