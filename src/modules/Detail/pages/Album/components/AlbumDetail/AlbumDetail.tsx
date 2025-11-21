import { FC, useMemo, useState } from 'react'

import { ExpandButton } from '@/components/Buttons'
import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { AlbumBadge } from '@/components/Shared/Badge'
import { TrackCollection } from '@/components/TrackCollection/TrackCollection'
import { TrackCollectionConfig } from '@/components/TrackCollection/TrackCollection.type'
import { useAlbumDetailQuery } from '@/hooks/album/useAlbumDetailQuery'
import { useAlbumDynamicQuery } from '@/hooks/album/useAlbumDynamicQuery'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import {
  AlbumDescription,
  AlbumHead3,
  AlbumParagraph,
} from './AlbumDetail.styles'

const INITIAL_DESCRIPTION_COUNT = 160

export const AlbumDetail: FC<{ albumId: number }> = ({ albumId }) => {
  const { data } = useAlbumDetailQuery(albumId)
  const { data: dynamic } = useAlbumDynamicQuery(albumId)

  const [showingMore, setShowingMore] = useState<boolean>(false)
  const descParagraphs = useMemo(() => {
    return data?.album.description
      .slice(0, showingMore ? undefined : INITIAL_DESCRIPTION_COUNT)
      .split('\n')
  }, [data?.album.description, showingMore])

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
    <Box>
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
            <MediaOperationBar
              counts={{
                share: dynamic?.shareCount,
                download: dynamic?.likedCount,
                comment: dynamic?.commentCount,
              }}
            />
          </Box>
        </Box>
      </Flex>

      <Box mt={20} mb={27}>
        <AlbumHead3>专辑介绍：</AlbumHead3>
        {descParagraphs?.map((line, index) => {
          const isLastLine = index === descParagraphs.length - 1
          const shouldShowEllipsis =
            !showingMore &&
            (data?.album.description?.length || 0) > INITIAL_DESCRIPTION_COUNT

          return (
            <AlbumDescription key={index}>
              {line}
              {isLastLine && shouldShowEllipsis && '...'}
            </AlbumDescription>
          )
        })}
        <Flex justify="flex-end">
          <ExpandButton
            expanded={!showingMore}
            onClick={() => setShowingMore(!showingMore)}
          />
        </Flex>
      </Box>

      <TrackCollection
        dataSource={{
          id: data.album.id,
          name: data.album.name,
          tracks: data.songs,
          trackCount: data.songs.length,
        }}
        config={config}
      />
    </Box>
  )
}
