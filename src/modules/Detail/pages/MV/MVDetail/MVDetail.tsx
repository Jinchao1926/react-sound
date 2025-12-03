import React, { FC } from 'react'

import { Box, Flex, Text } from '@/components/Core'
import { UserLink } from '@/components/Links'
import { MVBadge } from '@/components/Shared/Badge'
import {
  CollectGreyButton,
  LikeGreyButton,
  ShareGreyButton,
} from '@/components/Shared/Social'
import { useMVDynamicQuery } from '@/hooks/mv/useMVDynamicQuery'
import { useMVUrlQuery } from '@/hooks/mv/useMVUrlQuery'
import { MV } from '@/types/mv'

import { MVVideo } from './MVDetail.styles'

export const MVDetail: FC<{ mv: MV }> = ({ mv }) => {
  const { data: mvUrl } = useMVUrlQuery(mv.id)

  const { data: dynamic } = useMVDynamicQuery(mv.id)

  return (
    <Box mt={-10}>
      <Flex gap={5} align="baseline" mb={8}>
        <MVBadge />
        <Text fontSize={24} lineHeight={32} mr={3}>
          {mv.name}
        </Text>
        <UserLink users={mv.artists} color="#0c73c2" />
      </Flex>
      <MVVideo controls src={mvUrl?.url} />

      <Flex gap={10} mt={12}>
        <LikeGreyButton count={dynamic?.likedCount} />
        <CollectGreyButton count={mv.subCount} />
        <ShareGreyButton count={mv.shareCount} />
      </Flex>
    </Box>
  )
}
