import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import SectionHeaderMore from '@/components/section-header-more'
import { useAppSelector } from '@/store'
import { formatSizedImage } from '@/utils/format-utils'

import { SimilarPlaylistItem, SimilarPlaylistWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const SimilarPlaylist: FC<IProps> = () => {
  // redux
  const { similarPlaylists } = useAppSelector(
    (state) => ({
      similarPlaylists: state.song.similarPlaylists,
    }),
    shallowEqual
  )

  return (
    <SimilarPlaylistWrapper>
      <SectionHeaderMore title="包含这首歌的歌单" />
      <div className="playlists">
        {similarPlaylists.map((item) => {
          return (
            <SimilarPlaylistItem key={item.id}>
              <NavLink className="cover" to={`/playlist?id=${item.id}`}>
                <img
                  src={formatSizedImage(item.coverImgUrl, 50)}
                  alt={item.name}
                />
              </NavLink>
              <div className="info">
                <NavLink
                  className="playlist no-wrap"
                  to={`/playlist?id=${item.id}`}
                >
                  {item.name}
                </NavLink>
                <p className="author no-wrap">
                  by
                  <NavLink
                    className="author-name"
                    to={`/user/home?id=${item.creator.id}`}
                  >
                    {item.creator.nickname}
                  </NavLink>
                </p>
              </div>
            </SimilarPlaylistItem>
          )
        })}
      </div>
    </SimilarPlaylistWrapper>
  )
}

export default memo(SimilarPlaylist)
