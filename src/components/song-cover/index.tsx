import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { formatCount, formatSizedImage } from '@/utils/format-utils'

import { SongCoverWrapper } from './style'

interface IProps {
  children?: ReactNode
  info: any
  showSource?: boolean
}

const SongCover: FC<IProps> = (props: IProps) => {
  const { info, showSource = false } = props

  return (
    <SongCoverWrapper className="song-cover">
      <div className="cover">
        <a href={`/playlist?id=${info.id}`}>
          <img
            src={formatSizedImage(info.picUrl || info.coverImgUrl, 140)}
            alt={info.name}
          />
        </a>
        <div className="panel sprite_cover">
          <span className="headset sprite_icon" />
          <span className="play-count">{formatCount(info.playCount)}</span>
          <a className="play sprite_icon" href="todo" title="播放">
            {' '}
          </a>
        </div>
      </div>
      <a
        className={classNames('cover-info', { 'no-wrap': showSource === true })}
        href={`/playlist?id=${info.id}`}
      >
        {info.name}
      </a>
      {showSource && (
        <div className="cover-source">
          by
          <NavLink className="name" to={`/user/home/id=${info.creator.userId}`}>
            {info.creator.nickname}
          </NavLink>
          {info.creator.avatarDetail && (
            <img src={info.creator.avatarDetail.identityIconUrl} alt="" />
          )}
        </div>
      )}
    </SongCoverWrapper>
  )
}

export default memo(SongCover)
