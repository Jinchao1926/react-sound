import { type FC, useMemo } from 'react'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { CoverImage } from '@/components/CoverImage'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { AlbumBadge } from '@/components/Shared/Badge'
import { TrackCollection } from '@/components/TrackCollection/TrackCollection'
import { type TrackCollectionConfig } from '@/components/TrackCollection/TrackCollection.type'
import { useAlbumDetailQuery } from '@/hooks/album/useAlbumDetailQuery'
import { useAlbumDynamicQuery } from '@/hooks/album/useAlbumDynamicQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/format/dataFormat'
import { formatYearMonthDay } from '@/utils/format/timeFormat'

import { AlbumHead3, AlbumParagraph } from './AlbumDetail.styles'

export const AlbumDetail: FC<{ albumId: number }> = ({ albumId }) => {
  const { data } = useAlbumDetailQuery(albumId)
  const { data: dynamic } = useAlbumDynamicQuery(albumId)

  const { playTrack, playTracks, addToPlaylist, addTracksToPlaylist } =
    usePlayerContext()

  const descriptions = useMemo(() => {
    return data?.album.description.split('\n') || []
  }, [data?.album.description])

  const config: TrackCollectionConfig = useMemo(() => {
    return {
      headerTitle: '包含歌曲列表',
      showExternalLink: true,
      externalLinkType: 'album',
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
          coverIcon="albumXLarge"
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
              to={routeBuilder.user(data.album.artist.id)}
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
              callbacks={{
                onPlayClick: () => playTracks(data.songs),
                onAddClick: () => addTracksToPlaylist(data.songs),
              }}
            />
          </Box>
        </Box>
      </Flex>

      <Box mt={20} mb={27}>
        <AlbumHead3>专辑介绍：</AlbumHead3>
        <ExpandableParagraph
          maxChars={320}
          mt={4}
          lineHeight={24}
          textIndent="2em"
        >
          {descriptions}
        </ExpandableParagraph>
      </Box>

      <TrackCollection
        dataSource={{
          id: data.album.id,
          name: data.album.name,
          tracks: data.songs,
          trackCount: data.songs.length,
        }}
        config={config}
        callbacks={{
          onPlayClick: (track) => playTrack(track),
          onAddClick: (track) => addToPlaylist(track),
        }}
      />
    </Box>
  )
}
