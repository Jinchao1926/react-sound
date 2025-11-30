import React, { FC } from 'react'

import classNames from 'classnames'

import { Box, Text } from '@/components/Core'
import { usePlaylistCategoriesQuery } from '@/hooks/playlist/usePlaylistCategoriesQuery'
import { routeBuilder } from '@/routers'

import {
  PlaylistCategoryArrow,
  PlaylistCategoryHeader,
  PlaylistCategoryBody,
  PlaylistCategoryWrapper,
  PlaylistCategoryFooter,
  PlaylistCategoryAll,
  PlaylistCategoryLink,
  PlaylistCategoryItem,
  PlaylistCategoryIcon,
} from './PlaylistCategory.styles'

export const PlaylistCategory: FC<{ category: string }> = ({
  category: currentCategory,
}) => {
  const { data: categories } = usePlaylistCategoriesQuery()

  return (
    <PlaylistCategoryWrapper>
      <PlaylistCategoryHeader>
        <PlaylistCategoryArrow />
      </PlaylistCategoryHeader>

      <PlaylistCategoryBody>
        <Box height={37} pl={26} borderBottom="1px solid #e6e6e6">
          <PlaylistCategoryAll to={routeBuilder.discoverPlaylist()}>
            全部风格
          </PlaylistCategoryAll>
        </Box>

        {categories.map((category, index) => (
          <dl key={category.id}>
            <dt>
              <PlaylistCategoryIcon index={index} />
              {category.name}
            </dt>
            <dd>
              {category.subcategories.map((item) => (
                <PlaylistCategoryItem key={item.name}>
                  <PlaylistCategoryLink
                    className={classNames({
                      selected: currentCategory === item.name,
                    })}
                    to={routeBuilder.discoverPlaylist(item.name)}
                  >
                    {item.name}
                  </PlaylistCategoryLink>
                  <Text ml={10} mr={8} color="#d8d8d8">
                    |
                  </Text>
                </PlaylistCategoryItem>
              ))}
            </dd>
          </dl>
        ))}
      </PlaylistCategoryBody>

      <PlaylistCategoryFooter />
    </PlaylistCategoryWrapper>
  )
}
