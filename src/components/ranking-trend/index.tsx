import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames';

import { RankingTrendWrapper } from './style'

interface IProps {
  children?: ReactNode;
  lastRank: number;
  rank: number;
}

enum Trend {
  NEW = 'new',
  KEEP = 'keep',
  UP = 'up',
  DOWN = 'down'
}

const RankingTrend: FC<IProps> = (props: IProps) => {
  const { lastRank, rank } = props
  const [trend, setTrend] = useState<Trend>(Trend.NEW)

  useEffect(() => {
    if (lastRank <= 0) {
      setTrend(Trend.NEW)
    } else if (lastRank === rank) {
      setTrend(Trend.KEEP)
    } else if (lastRank > rank) {
      setTrend(Trend.UP)
    } else {
      setTrend(Trend.DOWN)
    }
  }, [lastRank, rank])

  return (
    <RankingTrendWrapper className={trend}>
      <span className={classNames('sprite_icon2', trend)} />
      {trend !== Trend.NEW && (trend === Trend.KEEP ? 0 : Math.abs(rank - lastRank))}
    </RankingTrendWrapper>
  )
}

export default memo(RankingTrend)