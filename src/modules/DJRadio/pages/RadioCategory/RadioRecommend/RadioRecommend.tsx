import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { useRadiosQuery } from '@/hooks/djradio/useRadiosQuery'
import { formatSizedImage } from '@/utils/formatUtils'

import {
  RadioRecommendWrapper,
  RadioItemWrapper,
} from './RadioRecommend.styles'

export const RadioRecommend: FC<{ id: number }> = ({ id }) => {
  const { data } = useRadiosQuery(id)

  return (
    <RadioRecommendWrapper>
      <SectionHeader title="优秀新电台" />
      <div className="radio-list">
        {data.map((item) => (
          <RadioItemWrapper key={item.id}>
            <NavLink className="cover" to={`/djradio?id=${item.id}`}>
              <img src={formatSizedImage(item.picUrl, 150)} alt="" />
            </NavLink>
            <NavLink className="name" to={`/djradio?id=${item.id}`}>
              {item.name}
            </NavLink>
            <p className="desc">{item.rcmdtext}</p>
          </RadioItemWrapper>
        ))}
      </div>
    </RadioRecommendWrapper>
  )
}
