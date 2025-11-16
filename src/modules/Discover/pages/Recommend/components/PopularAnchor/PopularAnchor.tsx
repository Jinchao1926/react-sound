import React, { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Box, Image, Text } from '@/components/UI'
import { popularAnchors } from '@/constants/anchor'
import { formatSizedImage } from '@/utils/dataFormat'

import { PopularAnchorContent, PopularAnchorItem } from './PopularAnchor.styles'

export const PopularAnchor: FC = () => {
  return (
    <Box mt={30}>
      <Box mx={20}>
        <SectionHeader variant="simple" title="热门主播" />
      </Box>
      <Box mt={20} ml={20}>
        {popularAnchors.map((item) => (
          <PopularAnchorItem key={item.picUrl} to={item.url}>
            <Image
              src={formatSizedImage(item.picUrl, 40)}
              alt={item.name}
              width={40}
              height={40}
              mr={10}
            />
            <PopularAnchorContent>
              <Text color="#000">{item.name}</Text>
              <Text color="#666" nowrap>
                {item.position}
              </Text>
            </PopularAnchorContent>
          </PopularAnchorItem>
        ))}
      </Box>
    </Box>
  )
}
