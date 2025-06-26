import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { NavLink } from 'react-router-dom'

import { RadioMoreWrapper, RadioMoreItemWrapper } from './style'
import SectionHeaderNormal from '@/components/section-header-normal'
import { formatSizedImage } from '@/utils/format-utils'

interface IProps {
  children?: ReactNode
  items: any[]
}

const RadioMore: FC<IProps> = (props: IProps) => {
  const { items } = props
  return (
    <RadioMoreWrapper>
      <SectionHeaderNormal
        title={`${items.length > 0 && items[0].category}·电台`}
        morePath={`/discover/djradio/category?id=${items.length > 0 && items[0].id}`}
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
