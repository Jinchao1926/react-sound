import React, { FC } from 'react'

import classNames from 'classnames'

import { routeBuilder } from '@/routers'
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
      to={routeBuilder.discoverRadioCategory(category.id)}
      className={classNames({ selected })}
    >
      <RadioCategoryImage bgImage={category.picWebUrl} />
      <RadioCategoryName>{category.name}</RadioCategoryName>
    </RadioCategoryLink>
  )
}
