import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { popularAnchors } from '@/constants/anchor'
import { formatSizedImage } from '@/utils/format-utils'

import { PopularAnchorWrapper } from './PopularAnchor.styles'

export const PopularAnchor: FC = () => {
  return (
    <PopularAnchorWrapper>
      <div className="header">
        <SectionHeader variant="simple" title="热门主播" />
      </div>
      <div className="anchor-list">
        {popularAnchors.map((item) => {
          return (
            <NavLink className="anchor" key={item.picUrl} to={item.url}>
              <img
                className="avatar"
                src={formatSizedImage(item.picUrl, 40)}
                alt=""
              />
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="desc no-wrap">{item.position}</span>
              </div>
            </NavLink>
          )
        })}
      </div>
    </PopularAnchorWrapper>
  )
}
