import { type FC } from 'react'

import { Box, Flex, Image, Paragraph, Sprite, Text } from '@/components/Core'
import { MediaOperationBar } from '@/components/MediaOperationBar'
import { type PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/format/dataFormat'
import { formatMonthDay } from '@/utils/format/timeFormat'

import { ToplistCover, ToplistCoverBright } from './ToplistDetailHeader.styles'

export const ToplistDetailHeader: FC<{ playlist: PlaylistDetail }> = ({
  playlist,
}) => {
  return (
    <Flex gap={30} mb={40}>
      <ToplistCover>
        <Image
          src={formatSizedImage(playlist.coverImgUrl, 150)}
          alt={playlist.name}
        />
        <ToplistCoverBright />
      </ToplistCover>

      <Box>
        <Paragraph mt={16} mb={4} fontSize={20}>
          {playlist.name}
        </Paragraph>
        <Flex align="center" gap={5} height={35} mb={20}>
          <Sprite sprite="icon" icon="clock" height={13} width={13} />
          <Text color="#666">
            最近更新：{formatMonthDay(playlist.updateTime)}
          </Text>
          {playlist.updateFrequency && (
            <Text color="#999">（{playlist.updateFrequency}）</Text>
          )}
        </Flex>
        <MediaOperationBar
          counts={{
            collect: playlist.subscribedCount,
            share: playlist.shareCount,
            comment: playlist.commentCount,
          }}
        />
      </Box>
    </Flex>
  )
}
