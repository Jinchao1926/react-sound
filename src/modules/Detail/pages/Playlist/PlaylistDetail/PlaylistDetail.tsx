import { FC, useMemo } from 'react'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { CoverImage } from '@/components/CoverImage'
import { IdentityIcon } from '@/components/IdentityIcon'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { PlaylistBadge } from '@/components/Shared/Badge'
import { TrackCollection } from '@/components/TrackCollection'
import { usePlaylistDetailQuery } from '@/hooks/playlist/usePlaylistDetailQuery'
import { usePlaylistDynamicQuery } from '@/hooks/playlist/usePlaylistDynamicQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import { PlaylistTagLink } from './PlaylistDetail.styles'

export const PlaylistDetail: FC<{ playlistId: number }> = ({ playlistId }) => {
  const { data: playlist } = usePlaylistDetailQuery(playlistId)
  const { data: dynamic } = usePlaylistDynamicQuery(playlistId)

  const config = useMemo(() => {
    return {
      maxRows: 20,
      showExternalLink: true,
      showAlbumColumn: true,
      showIndexTrend: false,
      showTitleCoverImage: false,
      columnWidths: {
        index: 74,
        duration: 111,
        artist: 90,
        album: 128,
      },
    }
  }, [])

  if (!playlist) return null

  return (
    <Flex vertical gap={27} mt={10}>
      <Flex gap={30}>
        <CoverImage
          src={formatSizedImage(playlist.coverImgUrl, 200)}
          alt={playlist.name}
          size={200}
          coverSprite="cover"
          coverIcon="bright200"
          coverEdge={-4}
        />

        <Box flex={1}>
          <Flex gap={10} mb={12}>
            <PlaylistBadge />
            <Text fontSize={20}>{playlist.name}</Text>
          </Flex>

          <Flex align="center" mb={20}>
            <CoverImage
              src={formatSizedImage(playlist.creator.avatarUrl, 35)}
              alt={playlist.creator.nickname}
              to={routeBuilder.user(playlist.creator.userId)}
              size={35}
            />
            <TextNavLink
              to={routeBuilder.user(playlist.creator.userId)}
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

          <Box mb={25}>
            <MediaOperationBar
              counts={{
                collect: dynamic?.bookedCount,
                share: dynamic?.shareCount,
                comment: dynamic?.commentCount,
              }}
            />
          </Box>

          {playlist.tags.length > 0 && (
            <Flex align="center">
              标签：
              {playlist.tags.map((tag) => (
                <PlaylistTagLink
                  key={tag}
                  to={routeBuilder.discoverPlaylist(tag)}
                >
                  {tag}
                </PlaylistTagLink>
              ))}
            </Flex>
          )}

          <ExpandableParagraph maxChars={198} mt={8} mb={0}>
            {`介绍： ${playlist.description}`}
          </ExpandableParagraph>
        </Box>
      </Flex>

      <TrackCollection dataSource={playlist} config={config} />
    </Flex>
  )
}
