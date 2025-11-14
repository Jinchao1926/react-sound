import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Sprite } from '@/components/UI'

export const ProgramRankingWrapper = styled.div`
  position: relative;
`

export const InfoIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'info',
  component: 'div',
})`
  position: absolute;
  top: 13px;
  right: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
`

export const RankingItem = styled.div`
  height: 40px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  // 奇偶
  :nth-child(odd) {
    background-color: white;
  }
  :nth-child(even) {
    background-color: #f7f7f7;
  }
  &:hover {
    background-color: #eee;
  }
`

export const RankingIndex = styled.span<{ highlight: boolean }>`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: ${({ highlight }) => (highlight ? '#da4545' : '#999')};
`

export const CategoryLink = styled(NavLink)`
  display: inline-block;
  color: #999;
  height: 16px;
  padding: 0 6px;
  border: 1px solid #999;
  line-height: 16px;
  &:hover {
    color: #666;
    border: 1px solid #666;
  }
`

export const Ranking = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'ranking',
  component: 'div',
})<{ marginLeft: number }>`
  display: block;
  position: relative;
  margin-left: ${(props) => props.marginLeft}px;
  width: 100px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`

export const RankingProgress = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'rankingProgress',
  component: 'i',
})<{ widthPercent: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ widthPercent }) => widthPercent}%;
`
