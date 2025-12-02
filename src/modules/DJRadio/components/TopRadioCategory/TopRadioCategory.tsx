import React, { FC } from 'react'

import { Box, Paragraph } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { useTopRadioCategoriesQuery } from '@/hooks/djradio/useTopRadioCategoriesQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'

import {
  TopRadioCategoryItem,
  RadioNameLink,
  TopRadioCategoryList,
} from './TopRadioCategory.styles'

export const TopRadioCategory: FC = () => {
  const { data: categories } = useTopRadioCategoriesQuery()

  return (
    <Box>
      {categories.map((category) => (
        <Box key={category.categoryId} mt={35}>
          <SectionHeader
            title={`${category.categoryName}·电台`}
            moreHref={routeBuilder.discoverRadioCategory(category.categoryId)}
          />
          <TopRadioCategoryList>
            {category.djRadios.map((radio) => (
              <TopRadioCategoryItem key={radio.id}>
                <CoverImage
                  src={formatSizedImage(radio.picUrl, 120)}
                  alt={radio.name}
                  to={routeBuilder.radio(radio.id)}
                  size={120}
                />

                <Box ml={20}>
                  <RadioNameLink to={routeBuilder.radio(radio.id)} color="#333">
                    {radio.name}
                  </RadioNameLink>
                  <Paragraph color="#999" lineHeight={20}>
                    {radio.rcmdtext}
                  </Paragraph>
                </Box>
              </TopRadioCategoryItem>
            ))}
          </TopRadioCategoryList>
        </Box>
      ))}
    </Box>
  )
}
