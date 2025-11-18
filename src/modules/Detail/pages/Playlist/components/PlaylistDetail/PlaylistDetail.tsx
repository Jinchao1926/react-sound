import { FC } from 'react'

import { Box, Flex, Image, Text, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { IdentityIcon } from '@/components/IdentityIcon'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { PlaylistTracks } from '@/components/PlaylistTracks'
import { PlaylistBadge } from '@/components/Shared/Logo'
import { usePlaylistDetailQuery } from '@/hooks/playlist/usePlaylistDetailQuery'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import { PlaylistCover, PlaylistDescription } from './PlaylistDetail.styles'

export const PlaylistDetail: FC<{ playlistId: number }> = ({ playlistId }) => {
  const { data: playlist } = usePlaylistDetailQuery(playlistId)

  if (!playlist) return null

  return (
    <Flex vertical gap={27}>
      <Flex gap={20} pt={6}>
        <PlaylistCover>
          <Image
            src={formatSizedImage(playlist.coverImgUrl, 200)}
            alt={playlist.name}
            width="100%"
            height="100%"
          />
        </PlaylistCover>

        <Box pt={4}>
          <Flex gap={10} mb={12}>
            <PlaylistBadge />
            <Text fontSize={20}>{playlist.name}</Text>
          </Flex>

          <Flex align="center" mb={20}>
            <CoverImage
              src={formatSizedImage(playlist.creator.avatarUrl, 35)}
              alt={playlist.creator.nickname}
              to={`/user/home?id=${playlist.creator.userId}`}
              size={35}
            />
            <TextNavLink
              to={`/user/home?id=${playlist.creator.userId}`}
              color="#0c73c2"
              ml={10}
            >
              {playlist.creator.nickname}
            </TextNavLink>
            <IdentityIcon avatarDetail={playlist.creator.avatarDetail} />

            <Text ml={15} color="#999">
              {formatYearMonthDay(playlist.createTime)} 创建
            </Text>
          </Flex>

          <MediaOperationBar />

          <PlaylistDescription>
            介绍：{playlist.description}
          </PlaylistDescription>
        </Box>
      </Flex>

      <PlaylistTracks playlist={playlist} />
    </Flex>
  )
}
