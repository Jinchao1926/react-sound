import { type FC, useMemo } from 'react'

import { Helmet } from 'react-helmet-async'

import { Box, Flex, Strong, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { CoverImage } from '@/components/CoverImage'
import { ExternalLink, RadioCategoryLink } from '@/components/Links'
import { ProgramBadge } from '@/components/Shared/Badge'
import {
  CommentGreyButton,
  DownloadGreyButton,
  LikeGreyButton,
  PlayBlueButton,
  ShareGreyButton,
} from '@/components/Shared/Social'
import { TrackCollection } from '@/components/TrackCollection'
import { usePlayProgram } from '@/hooks/player/usePlayProgram'
import { useProgramDetailQuery } from '@/hooks/program/useProgramDetailQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { formatPlayCount, formatSizedImage } from '@/utils/format/dataFormat'
import {
  formatMinuteSecond,
  formatYearMonthDay,
} from '@/utils/format/timeFormat'
import { normalizeTracks } from '@/utils/track/normalizeTrack'

import {
  RadioIcon,
  RadioName,
  StarredIcon,
  SubscribeButton,
} from './ProgramDetail.styles'

export const ProgramDetail: FC<{ programId: number }> = ({ programId }) => {
  const { data: program } = useProgramDetailQuery(programId)

  const { playTrack, addToPlaylist } = usePlayerContext()
  const { play } = usePlayProgram()

  const config = useMemo(() => {
    return {
      headerTitle: '节目包含歌曲列表',
      showExpandableHeader: true,
      showAlbumColumn: true,
      showIndexTrend: false,
      showTitleCoverImage: false,
      columnWidths: {
        index: 75,
        duration: 89,
        artist: 90,
        album: 128,
      },
    }
  }, [])

  if (!program) return null

  return (
    <>
      <Helmet>
        <title>
          {program.name} - {program.radio.name} - 电台节目 - React Sound
        </title>
        <meta
          name="description"
          content={program.description || program.name}
        />
      </Helmet>
      <Box mt={10}>
        <Flex gap={22}>
          <CoverImage
            src={formatSizedImage(program.coverUrl, 140)}
            alt={program.name}
            size={140}
            bordered
          />

          <Box pt={18} flex={1}>
            <Flex gap={10} mb={29}>
              <ProgramBadge />
              <Text fontSize={20}>{program.name}</Text>
            </Flex>

            {/* DJRadio */}
            <Flex align="center" gap={8}>
              <RadioIcon />
              <TextNavLink
                to={routeBuilder.radio(program.radio.id)}
                fontSize={16}
              >
                {program.radio.name}
              </TextNavLink>

              <SubscribeButton>
                <StarredIcon $starred={program.subscribed} />
                {program.subscribed ? '已订阅' : '订阅'}
                {`(${formatPlayCount(program.subscribedCount)})`}
              </SubscribeButton>
            </Flex>
          </Box>
        </Flex>

        <Flex gap={26} mt={20} mb={25}>
          <Flex gap={10} align="center">
            <PlayBlueButton
              title={`播放 ${formatMinuteSecond(program.duration, 'chinese')}`}
              onClick={() => play(program.id)}
            />
            <LikeGreyButton count={program.likedCount} />
            <CommentGreyButton count={program.commentCount} />
            <ShareGreyButton count={program.shareCount} />
            <DownloadGreyButton />
          </Flex>

          <ExternalLink id={program.id} type="program" underline={false} />
        </Flex>

        <Flex align="center" height={35}>
          <RadioCategoryLink
            category={{
              id: program.radio.categoryId,
              name: program.radio.category,
            }}
          />
          <RadioName>{`${program.radio.name}  第${program.serialNum}期`}</RadioName>
          <Text mx={18} color="#999">
            {formatYearMonthDay(program.createTime)} 创建
          </Text>
          <Text color="#999">
            播放：<Strong color="#c20c0c">{program.listenerCount}</Strong>次
          </Text>
        </Flex>

        <Box mb={27}>
          <ExpandableParagraph maxChars={320} lineHeight={23} m={0}>
            {`介绍： ${program.description}`}
          </ExpandableParagraph>
        </Box>

        {program.trackCount > 1 && (
          <TrackCollection
            dataSource={{
              id: program.id,
              name: program.name,
              tracks: normalizeTracks(program.songs),
              trackCount: program.trackCount,
              playCount: program.listenerCount,
            }}
            config={config}
            callbacks={{
              onPlayClick: (track) => playTrack(track),
              onAddClick: (track) => addToPlaylist(track),
            }}
          />
        )}
      </Box>
    </>
  )
}
