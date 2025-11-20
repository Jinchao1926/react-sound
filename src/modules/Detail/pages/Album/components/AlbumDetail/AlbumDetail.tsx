import { FC } from 'react'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { PlaylistBadge } from '@/components/Shared/Badge'
import { useAlbumDetailQuery } from '@/hooks/album/useAlbumDetailQuery'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import { AlbumParagraph } from './AlbumDetail.styles'

export const AlbumDetail: FC<{ albumId: number }> = ({ albumId }) => {
  const { data: album } = useAlbumDetailQuery(albumId)

  if (!album) return null

  return (
    <Flex vertical gap={27}>
      <Flex gap={53}>
        <CoverImage
          src={formatSizedImage(album.picUrl, 177)}
          alt={album.name}
          size={177}
          coverSprite="cover"
          coverIcon={'albumLarge'}
          coverWidth={209}
        />

        <Box>
          <Flex gap={10} mb={12}>
            <PlaylistBadge />
            <Text fontSize={20}>{album.name}</Text>
          </Flex>
          <AlbumParagraph>
            歌手：
            <TextNavLink
              to={`/user/home?id=${album.artist.id}`}
              color="#0c73c2"
            >
              {album.artist.name}
            </TextNavLink>
          </AlbumParagraph>
          <AlbumParagraph>
            发行时间：{formatYearMonthDay(album.publishTime)}
          </AlbumParagraph>
          <AlbumParagraph>发行公司：{album.company}</AlbumParagraph>

          <Box mt={20}>
            <MediaOperationBar />
          </Box>

          {/* <PlaylistDescription>
            介绍：{playlist.description}
          </PlaylistDescription> */}
        </Box>
      </Flex>

      {/* <PlaylistTracks playlist={playlist} config={config} /> */}
    </Flex>
  )
}
