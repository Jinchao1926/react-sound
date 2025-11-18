import React, { FC } from 'react'

import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { Box, Paragraph } from '@/components/UI'
import { useTopRadioCategoriesQuery } from '@/hooks/djradio/useTopRadioCategoriesQuery'
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
            moreHref={`/discover/djradio/category?id=${category.categoryId}`}
          />
          <TopRadioCategoryList>
            {category.djRadios.map((radio) => (
              <TopRadioCategoryItem key={radio.id}>
                <CoverImage
                  src={formatSizedImage(radio.picUrl, 120)}
                  alt={radio.name}
                  to={`/djradio?id=${radio.id}`}
                  size={120}
                />

                <Box ml={20}>
                  <RadioNameLink to={`/djradio?id=${radio.id}`} color="#333">
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
