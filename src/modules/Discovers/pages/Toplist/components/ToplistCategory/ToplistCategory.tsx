import React, { FC, useEffect, useState } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { TopPlaylist } from '@/types/playlist'
import { formatSizedImage } from '@/utils/format-utils'

import { ToplistCategoryWrapper } from './ToplistCategory.styles'

interface ToplistCategoryProps {
  id?: number
  toplists: TopPlaylist[]
}

export const ToplistCategory: FC<ToplistCategoryProps> = ({ id, toplists }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (id) {
      const idx = toplists.findIndex((item) => item.id === id)
      if (idx !== -1) {
        setSelectedIndex(idx)
      }
    }
  }, [toplists, id])

  return (
    <ToplistCategoryWrapper>
      {toplists.map((item, idx) => {
        let header
        if (idx === 0 || idx === 4) {
          header =
            idx === 0 ? (
              <h2 className="header1">云音乐特色榜</h2>
            ) : (
              <h2 className="header2">全球媒体榜</h2>
            )
        }
        return (
          <React.Fragment key={item.id}>
            {header}
            <NavLink
              className={classNames('category', {
                selected: selectedIndex === idx,
              })}
              to={`/discover/toplist?id=${item.id}`}
            >
              <div className="content">
                <img src={formatSizedImage(item.coverImgUrl, 40)} alt="" />
                <div className="info">
                  <p className="name">{item.name}</p>
                  <p className="frequency">{item.updateFrequency}</p>
                </div>
              </div>
            </NavLink>
          </React.Fragment>
        )
      })}
    </ToplistCategoryWrapper>
  )
}
