import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import SectionHeaderMore from '@/components/SectionHeaderMore'
import { useTopArtistQuery } from '@/hooks/artist/useTopArtistQuery'
import { formatSizedImage } from '@/utils/format-utils'

import { SignedArtistWrapper } from './SignedArtist.styles'

export const SignedArtist: FC = () => {
  const { data } = useTopArtistQuery()

  return (
    <SignedArtistWrapper>
      <div className="header">
        <SectionHeaderMore title="入驻歌手" morePath="/discover/artist" />
      </div>
      <div className="singer-list">
        {data.map((item) => {
          return (
            <NavLink
              className="singer"
              key={item.id}
              to={`/discover/artist?id=${item.id}`}
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
    </SignedArtistWrapper>
  )
}
