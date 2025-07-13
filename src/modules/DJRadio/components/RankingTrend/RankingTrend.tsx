import React, { FC, useMemo } from 'react'

import classNames from 'classnames'

import { RankingTrendWrapper } from './RankingTrend.styles'

const Trend = {
  NEW: 'new',
  KEEP: 'keep',
  UP: 'up',
  DOWN: 'down',
} as const

interface RankingTrendProps {
  lastRank: number
  rank: number
}

export const RankingTrend: FC<RankingTrendProps> = ({ lastRank, rank }) => {
  const trend = useMemo(() => {
    if (lastRank <= 0) {
      return Trend.NEW
    } else if (lastRank === rank) {
      return Trend.KEEP
    } else if (lastRank > rank) {
      return Trend.UP
    } else {
      return Trend.DOWN
    }
  }, [lastRank, rank])

  return (
    <RankingTrendWrapper className={trend}>
      <span className={classNames('sprite_icon2', trend)} />
      {trend !== Trend.NEW &&
        (trend === Trend.KEEP ? 0 : Math.abs(rank - lastRank))}
    </RankingTrendWrapper>
  )
}
