import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { useTopRadioCategoriesQuery } from '@/hooks/djradio/useTopRadioCategoriesQuery'
import { formatSizedImage } from '@/utils/format-utils'

import {
  TopRadioCategoryWrapper,
  TopRadioCategoryItem,
} from './TopRadioCategory.styles'

export const TopRadioCategory: FC = () => {
  const { data: categories } = useTopRadioCategoriesQuery()

  return (
    <div>
      {categories.map((category) => (
        <TopRadioCategoryWrapper key={category.categoryId}>
          <SectionHeader
            title={`${category.categoryName}·电台`}
            moreHref={`/discover/djradio/category?id=${category.categoryId}`}
          />
          <div className="radio-list">
            {category.djRadios.map((radio) => (
              <TopRadioCategoryItem key={radio.id}>
                <NavLink
                  className="left"
                  to={`/discover/djradio?id=${radio.id}`}
                >
                  <img src={formatSizedImage(radio.picUrl, 120)} alt="" />
                </NavLink>
                <div className="right">
                  <h3 className="name">{radio.name}</h3>
                  <p className="desc">{radio.rcmdtext}</p>
                </div>
              </TopRadioCategoryItem>
            ))}
          </div>
        </TopRadioCategoryWrapper>
      ))}
    </div>
  )
}
