import type { FC } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { PlaylistDetail, PopularPlaylist } from '@/types/playlist'
import { formatPlayCount, formatSizedImage } from '@/utils/dataFormat'

import { PlaylistCoverWrapper } from './PlaylistCover.styles'

export const PlaylistCover: FC<{
  playlist: PlaylistDetail | PopularPlaylist
}> = ({ playlist }) => {
  const getImageUrl = () => {
    if ('coverImgUrl' in playlist) return playlist.coverImgUrl
    return playlist.picUrl
  }

  const hasCreator = 'creator' in playlist && playlist.creator !== undefined

  const renderCreator = () => {
    if (!hasCreator) return null

    const { creator } = playlist as PlaylistDetail

    return (
      <div className="cover-source">
        by
        <NavLink className="name" to={`/user/home/id=${creator.userId}`}>
          {creator.nickname}
        </NavLink>
        {creator.avatarDetail && (
          <img src={creator.avatarDetail.identityIconUrl} alt="" />
        )}
      </div>
    )
  }

  return (
    <PlaylistCoverWrapper className="song-cover">
      <div className="cover">
        <NavLink to={`/playlist?id=${playlist.id}`}>
          <img src={formatSizedImage(getImageUrl(), 140)} alt={playlist.name} />
        </NavLink>
        <div className="panel sprite_cover">
          <span className="headset sprite_icon" />
          <span className="play-count">
            {formatPlayCount(playlist.playCount)}
          </span>
          <a className="play sprite_icon" href="todo" title="播放" />
        </div>
      </div>
      <NavLink
        className={classNames('cover-info', { 'no-wrap': hasCreator })}
        to={`/playlist?id=${playlist.id}`}
      >
        {playlist.name}
      </NavLink>
      {renderCreator()}
    </PlaylistCoverWrapper>
  )
}
