import { FC } from 'react'

import { Box, Flex, Text, TextNavLink } from '@/components/Core'
import { ExpandableParagraph } from '@/components/Core/Common/ExpandableParagraph'
import { Strong } from '@/components/Core/Common/Text'
import { CoverImage } from '@/components/CoverImage'
import { ExternalLink } from '@/components/Links'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { ProgramBadge } from '@/components/Shared/Badge'
// import { TrackCollection } from '@/components/TrackCollection'
import { useProgramDetailQuery } from '@/hooks/program/useProgramDetailQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import { RadioCategory, RadioIcon, RadioName } from './ProgramDetail.styles'

// import { PlaylistCover, PlaylistTagLink } from './PlaylistDetail.styles'

export const ProgramDetail: FC<{ programId: number }> = ({ programId }) => {
  const { data: program } = useProgramDetailQuery(programId)

  //   const config = useMemo(() => {
  //     return {
  //       maxRows: 20,
  //       showExternalLink: true,
  //       showAlbumColumn: true,
  //       showIndexTrend: false,
  //       showTitleCoverImage: false,
  //       columnWidths: {
  //         index: 74,
  //         duration: 111,
  //         artist: 90,
  //         album: 128,
  //       },
  //     }
  //   }, [])

  if (!program) return null

  return (
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
          </Flex>

          {/* <GreyButton>{program.subscribed ? '已订阅' : '订阅'}</GreyButton> */}
        </Box>
      </Flex>

      <Flex gap={26} mt={20} mb={25}>
        <MediaOperationBar
          counts={{
            collect: program.likedCount,
            share: program.shareCount,
            comment: program.commentCount,
          }}
        />
        <ExternalLink id={program.id} type="program" underline={false} />
      </Flex>

      <Flex align="center" height={35}>
        <RadioCategory to={routeBuilder.radio(program.radio.id)}>
          {program.radio.category}
        </RadioCategory>
        <RadioName>{`${program.radio.name}  第${program.serialNum}期`}</RadioName>
        <Text mx={18} color="#999">
          {formatYearMonthDay(program.createTime)} 创建
        </Text>
        <Text color="#999">
          播放：<Strong color="#c20c0c">{program.listenerCount}</Strong>次
        </Text>
      </Flex>

      <ExpandableParagraph maxChars={166} lineHeight={23} m={0}>
        {`介绍： ${program.description}`}
      </ExpandableParagraph>

      {/* <TrackCollection dataSource={playlist} config={config} /> */}
    </Box>
  )
}
