import styled from 'styled-components'

import { Sprite } from '@/components/UI'

export const RankingTrendWrapper = styled.div`
  text-align: center;
  font-size: 10px;

  &.keep {
    color: #999;
  }
  &.up {
    color: #ba2226;
  }
  &.down {
    color: #4abbeb;
  }
`

export const Trend = {
  NEW: 'new',
  KEEP: 'keep',
  UP: 'up',
  DOWN: 'down',
} as const
export type TrendType = keyof typeof Trend
export type TrendValue = (typeof Trend)[TrendType]

const trendIconMap: Record<TrendValue, string> = {
  new: 'trendNew',
  keep: 'trendKeep',
  up: 'trendUp',
  down: 'trendDown',
}

export const TrendIcon = styled(Sprite).attrs<{ trend: TrendValue }>(
  (props) => ({
    sprite: 'icon',
    icon: trendIconMap[props.trend],
  })
)<{ trend: TrendValue }>`
  display: inline-block;
  margin: -1px 2px 0 0;
  width: 6px;
  height: 6px;
`

export const TrendNewIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'trendNew',
})`
  display: inline-block;
  margin: -1px 2px 0 0;
  width: 16px;
  height: 17px;
`
