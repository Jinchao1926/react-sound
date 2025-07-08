import React, { memo } from 'react'
import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { Radio } from '@/types/djradio'
import { formatSizedImage } from '@/utils/format-utils'

import { RadioMoreWrapper, RadioMoreItemWrapper } from './style'

interface IProps {
  items: Radio[]
}

const RadioMore: FC<IProps> = (props: IProps) => {
  const { items } = props
  return (
    <RadioMoreWrapper>
      <SectionHeader
        title={`${items.length > 0 && items[0].category}·电台`}
        moreHref={`/discover/djradio/category?id=${items.length > 0 && items[0].id}`}
      />
      <div className="radio-list">
        {items.slice(0, 4).map((item) => {
          return (
            <RadioMoreItemWrapper key={item.id}>
              <NavLink className="left" to={`/discover/radio?id=${item.id}`}>
                <img src={formatSizedImage(item.picUrl, 120)} alt="" />
              </NavLink>
              <div className="right">
                <h3 className="name">{item.name}</h3>
                <p className="desc">{item.rcmdtext}</p>
              </div>
            </RadioMoreItemWrapper>
          )
        })}
      </div>
    </RadioMoreWrapper>
  )
}

export default memo(RadioMore)
