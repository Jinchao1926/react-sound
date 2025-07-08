import React, { FC } from 'react'

import classNames from 'classnames'

import { RadioCategory } from '@/types/djradio'

import {
  RadioCategoryImage,
  RadioCategoryLink,
  RadioCategoryName,
} from './RadioCategoryItem.styles'

interface RadioCategoryItemProps {
  category: RadioCategory
  selected: boolean
}

export const RadioCategoryItem: FC<RadioCategoryItemProps> = ({
  category,
  selected,
}) => {
  return (
    <RadioCategoryLink
      to={`/discover/djradio/category?id=${category.id}`}
      className={classNames('sprite_radio', { selected })}
    >
      <RadioCategoryImage className="icon" bgImage={category.picWebUrl} />
      <RadioCategoryName>{category.name}</RadioCategoryName>
    </RadioCategoryLink>
  )
}
