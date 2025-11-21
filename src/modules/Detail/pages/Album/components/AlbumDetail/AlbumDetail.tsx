import { FC, useMemo } from 'react'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { AlbumBadge } from '@/components/Shared/Badge'
import { TrackCollection } from '@/components/TrackCollection/TrackCollection'
import { TrackCollectionConfig } from '@/components/TrackCollection/TrackCollection.type'
import { useAlbumDetailQuery } from '@/hooks/album/useAlbumDetailQuery'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import { AlbumParagraph } from './AlbumDetail.styles'

export const AlbumDetail: FC<{ albumId: number }> = ({ albumId }) => {
  const { data } = useAlbumDetailQuery(albumId)

  const config: TrackCollectionConfig = useMemo(() => {
    return {
      headerTitle: '包含歌曲列表',
      showOutchainLink: true,
      outchainType: 'album',
      showAlbumColumn: false,
      showIndexTrend: false,
      showTitleCoverImage: false,
      columnWidths: {
        index: 74,
        duration: 91,
        artist: 128,
      },
    }
  }, [])

  if (!data) return null

  return (
    <Flex vertical gap={27}>
      <Flex gap={53}>
        <CoverImage
          src={formatSizedImage(data.album.picUrl, 177)}
          alt={data.album.name}
          size={177}
          coverSprite="cover"
          coverIcon={'albumLarge'}
          coverWidth={209}
        />

        <Box>
          <Flex gap={10} mb={12}>
            <AlbumBadge />
            <Text fontSize={20}>{data.album.name}</Text>
          </Flex>
          <AlbumParagraph>
            歌手：
            <TextNavLink
              to={`/user/home?id=${data.album.artist.id}`}
              color="#0c73c2"
            >
              {data.album.artist.name}
            </TextNavLink>
          </AlbumParagraph>
          <AlbumParagraph>
            发行时间：{formatYearMonthDay(data.album.publishTime)}
          </AlbumParagraph>
          <AlbumParagraph>发行公司：{data.album.company}</AlbumParagraph>

          <Box mt={20}>
            <MediaOperationBar />
          </Box>
        </Box>
      </Flex>

      <TrackCollection
        dataSource={{
          id: data.album.id,
          name: data.album.name,
          tracks: data.songs,
          trackCount: data.songs.length,
        }}
        config={config}
      />
    </Flex>
  )
}
