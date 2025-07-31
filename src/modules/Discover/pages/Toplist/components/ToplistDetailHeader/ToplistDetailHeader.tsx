import React, { FC } from 'react'

import SongOperationBar from '@/components/SongOperationBar'
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage, formatMonthDay } from '@/utils/formatUtils'

import { ToplistDetailWrapper } from './ToplistDetailHeader.styles'

export const ToplistDetailHeader: FC<{ playlist: PlaylistDetail }> = ({
  playlist,
}) => {
  return (
    <ToplistDetailWrapper>
      <div className="cover">
        <img src={formatSizedImage(playlist.coverImgUrl, 150)} alt="" />
        <span className="sprite_cover" />
      </div>
      <div className="info">
        <div className="title">{playlist.name}</div>
        <div className="update">
          <span className="icon sprite_icon2" />
          <span className="time">
            最近更新：{formatMonthDay(playlist.updateTime)}
          </span>
          {playlist.updateFrequency && (
            <span className="frequency">（{playlist.updateFrequency}）</span>
          )}
        </div>
        <SongOperationBar
          titles={{
            collectTitle: `(${playlist.subscribedCount})`,
            shareTitle: `(${playlist.shareCount})`,
            commentTitle: `(${playlist.commentCount})`,
          }}
        />
      </div>
    </ToplistDetailWrapper>
  )
}
