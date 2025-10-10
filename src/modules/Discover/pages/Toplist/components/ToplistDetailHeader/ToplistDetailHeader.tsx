import React, { FC } from 'react'

import SongOperationBar from '@/components/SongOperationBar'
import { Box, Flex, Image, Paragraph, Sprite, Text } from '@/components/UI'
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatMonthDay } from '@/utils/timeFormat'

import { ToplistCover, ToplistCoverBright } from './ToplistDetailHeader.styles'

export const ToplistDetailHeader: FC<{ playlist: PlaylistDetail }> = ({
  playlist,
}) => {
  return (
    <Flex gap={30} p={40}>
      <ToplistCover>
        <Image src={formatSizedImage(playlist.coverImgUrl, 150)} alt="" />
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

        <SongOperationBar
          titles={{
            collectTitle: `(${playlist.subscribedCount})`,
            shareTitle: `(${playlist.shareCount})`,
            commentTitle: `(${playlist.commentCount})`,
          }}
        />
      </Box>
    </Flex>
  )
}
