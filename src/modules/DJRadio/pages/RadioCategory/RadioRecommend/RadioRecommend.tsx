import React, { FC } from 'react'

import { Box, Paragraph } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { useRadiosQuery } from '@/hooks/djradio/useRadiosQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

import { RadioNameLink, RadioItemList } from './RadioRecommend.styles'

export const RadioRecommend: FC<{ id: number }> = ({ id }) => {
  const { data } = useRadiosQuery(id)

  return (
    <Box mt={20}>
      <SectionHeader title="优秀新电台" />
      <RadioItemList>
        {data.map((item) => (
          <Box key={item.id}>
            <CoverImage
              src={formatSizedImage(item.picUrl, 150)}
              alt={item.name}
              to={routeBuilder.radio(item.id)}
              size={150}
            />

            <RadioNameLink to={routeBuilder.radio(item.id)}>
              {item.name}
            </RadioNameLink>
            <Paragraph color="#999" lineHeight={18} m={0}>
              {item.rcmdtext}
            </Paragraph>
          </Box>
        ))}
      </RadioItemList>
    </Box>
  )
}
