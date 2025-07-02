import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import SectionHeaderMore from '@/components/section-header-more'
import { useAppSelector } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

import { ResidentSingerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const ResidentSinger: FC<IProps> = () => {
  // redux
  const { hotSingers } = useAppSelector(
    (state) => ({
      hotSingers: state.recommend.hotSingers,
    }),
    shallowEqual
  )

  return (
    <ResidentSingerWrapper>
      <div className="header">
        <SectionHeaderMore title="入驻歌手" morePath="/discover/artist" />
      </div>
      <div className="singer-list">
        {hotSingers.map((item) => {
          return (
            <NavLink
              className="singer"
              key={item.id}
              to={`/artist?id=${item.id}`}
            >
              <img
                className="avatar"
                src={formatSizedImage(item.picUrl, 62)}
                alt=""
              />
              <div className="info">
                <h4 className="name">{item.name}</h4>
                <p className="desc no-wrap">
                  {item.alias.join(' ') || item.name}
                </p>
              </div>
            </NavLink>
          )
        })}
      </div>
      <div className="footer">
        <a href="/#">申请成为网易音乐人</a>
      </div>
    </ResidentSingerWrapper>
  )
}

export default memo(ResidentSinger)
