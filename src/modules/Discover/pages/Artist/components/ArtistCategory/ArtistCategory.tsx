import React, { FC } from 'react'

import { Box } from '@/components/Core'

import {
  ArtistCategoryHeader,
  ArtistCategoryItem,
  ArtistCategoryLink,
} from './ArtistCategory.styles'
import { useSelectedCategory } from '../../hooks/useSelectedCategory'

export const ArtistCategory: FC = () => {
  const { categories, selectedArea, selectedType } = useSelectedCategory()

  return (
    <Box pt={51} px={10} pb={40}>
      {categories.map((category) => {
        return (
          <ArtistCategoryItem key={category.area}>
            <ArtistCategoryHeader>{category.label}</ArtistCategoryHeader>
            <>
              {category.types.map((type) => (
                <ArtistCategoryLink
                  key={type.type}
                  to={`/discover/artist?area=${category.area}&type=${type.type}`}
                  $selected={
                    category.area === selectedArea && type.type === selectedType
                  }
                >
                  {`${category.label}${type.label}`}
                </ArtistCategoryLink>
              ))}
            </>
          </ArtistCategoryItem>
        )
      })}
    </Box>
  )
}
