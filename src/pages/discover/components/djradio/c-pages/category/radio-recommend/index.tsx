import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { RadioRecommendWrapper, RadioItemWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'
import { useAppSelector } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

interface IProps {
  children?: ReactNode
}

const RadioRecommend: FC<IProps> = () => {
  const recommendedRadios = useAppSelector(
    (state) => state.radio.recommendRadios,
    shallowEqual
  )
  return (
    <RadioRecommendWrapper>
      <SectionHeaderNormal title="优秀新电台" />
      <div className="radio-list">
        {recommendedRadios.slice(0, 5).map((item) => {
          return (
            <RadioItemWrapper key={item.id}>
              <NavLink className="cover" to={`/discover/radio?id=${item.id}`}>
                <img src={formatSizedImage(item.picUrl, 150)} alt="" />
              </NavLink>
              <NavLink className="name" to={`/discover/radio?id=${item.id}`}>
                {item.name}
              </NavLink>
              <p className="desc">{item.rcmdtext}</p>
            </RadioItemWrapper>
          )
        })}
      </div>
    </RadioRecommendWrapper>
  )
}

export default memo(RadioRecommend)
