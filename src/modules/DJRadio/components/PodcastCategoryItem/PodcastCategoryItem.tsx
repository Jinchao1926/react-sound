import React, { FC } from 'react'

import classNames from 'classnames'

import { PodcastCategory } from '@/types/djradio'

import {
  PodcastCategoryImage,
  PodcastCategoryLink,
  PodcastCategoryName,
} from './PodcastCategoryItem.styles'

interface PodcastCategoryItemProps {
  category: PodcastCategory
  selected: boolean
}

export const PodcastCategoryItem: FC<PodcastCategoryItemProps> = ({
  category,
  selected,
}) => {
  return (
    <PodcastCategoryLink
      to={`/discover/djradio/category?id=${category.id}`}
      className={classNames('sprite_radio', { selected })}
    >
      <PodcastCategoryImage className="icon" bgImage={category.picWebUrl} />
      <PodcastCategoryName>{category.name}</PodcastCategoryName>
    </PodcastCategoryLink>
  )
}
