import React, { FC, useMemo } from 'react'

import {
  RankingTrendWrapper,
  Trend,
  TrendIcon,
  TrendNewIcon,
} from './RankingTrend.styles'

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
      {trend === Trend.NEW ? (
        <TrendNewIcon />
      ) : (
        <>
          <TrendIcon trend={trend} />
          {Math.abs(rank - lastRank)}
        </>
      )}
    </RankingTrendWrapper>
  )
}
