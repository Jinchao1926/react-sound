import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'

import SongOperationBar from '@/components/SongOperationBar'
import { useAppSelector } from '@/store'
import { formatSizedImage, formatMonthDay } from '@/utils/format-utils'

import { RankingInfoWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const RankingHeader: FC<IProps> = () => {
  const { playlist, frequency } = useAppSelector(
    (state) => ({
      playlist: state.ranking.currentPlaylist,
      frequency: state.ranking.currentFrequency,
    }),
    shallowEqual
  )

  return (
    <RankingInfoWrapper>
      {playlist && (
        <>
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
              <span className="frequency">（{frequency}）</span>
            </div>
            <SongOperationBar
              titles={{
                collectTitle: `(${playlist.subscribedCount})`,
                shareTitle: `(${playlist.shareCount})`,
                commentTitle: `(${playlist.commentCount})`,
              }}
            />
          </div>
        </>
      )}
    </RankingInfoWrapper>
  )
}

export default memo(RankingHeader)
