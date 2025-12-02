import React, { type FC } from 'react'

import { Box, Flex } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { usePlaylistDetailQuery } from '@/hooks/playlist/usePlaylistDetailQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

export const PlaylistSubscribers: FC<{ playlistId: number }> = ({
  playlistId,
}) => {
  const { data: playlist } = usePlaylistDetailQuery(playlistId)

  if (!playlist || !playlist.subscribers) return null

  return (
    <Box>
      <SectionHeader variant="simple" title="喜欢这个歌单的人" />
      <Flex justify="space-between" mt={20} mb={38} gap={12} wrap="wrap">
        {playlist.subscribers.map((subscriber) => (
          <CoverImage
            key={subscriber.userId}
            src={formatSizedImage(subscriber.avatarUrl, 40)}
            alt={subscriber.nickname}
            to={routeBuilder.user(subscriber.userId)}
            size={40}
          />
        ))}
      </Flex>
    </Box>
  )
}
