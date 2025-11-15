import React, { FC } from 'react'

import { SectionHeader } from '@/components/SectionHeader'
import { Box, Image, Text } from '@/components/UI'
import { useTopArtistQuery } from '@/hooks/artist/useTopArtistQuery'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  BecomeSingerLink,
  SingerContent,
  SingerLink,
} from './SignedArtist.styles'

export const SignedArtist: FC = () => {
  const { data } = useTopArtistQuery()

  return (
    <Box mt={15}>
      <Box mx={20}>
        <SectionHeader
          variant="simple"
          title="入驻歌手"
          moreHref="/discover/artist"
        />
      </Box>
      <Box mt={6} mb={14} ml={20}>
        {data.map((item) => (
          <SingerLink key={item.id} to={`/discover/artist?id=${item.id}`}>
            <Image
              src={formatSizedImage(item.picUrl, 62)}
              alt={item.name}
              width={62}
              height={62}
            />
            <SingerContent>
              <Text mt={12} color="#333" fontSize={14} fontWeight={600}>
                {item.name}
              </Text>
              <Text mt={8} color="#666" fontSize={12} nowrap>
                {item.alias.join(' ') || item.name}
              </Text>
            </SingerContent>
          </SingerLink>
        ))}
      </Box>

      <BecomeSingerLink href="/#">申请成为网易音乐人</BecomeSingerLink>
    </Box>
  )
}
