import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { useTopArtistQuery } from '@/hooks/artist/useTopArtistQuery'
import { formatSizedImage } from '@/utils/dataFormat'

import { SignedArtistWrapper } from './SignedArtist.styles'

export const SignedArtist: FC = () => {
  const { data } = useTopArtistQuery()

  return (
    <SignedArtistWrapper>
      <div className="header">
        <SectionHeader
          variant="simple"
          title="入驻歌手"
          moreHref="/discover/artist"
        />
      </div>
      <div className="singer-list">
        {data.map((item) => (
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
        ))}
      </div>
      <div className="footer">
        <a href="/#">申请成为网易音乐人</a>
      </div>
    </SignedArtistWrapper>
  )
}
