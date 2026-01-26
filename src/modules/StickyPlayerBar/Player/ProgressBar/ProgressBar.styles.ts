import styled from 'styled-components'

import { Sprite } from '@/components/Core/Spirit/Sprite'

export interface ProgressBarFullProps {
  width: number
}
export const ProgressBarFull = styled(Sprite).attrs<ProgressBarFullProps>({
  sprite: 'progress',
  icon: 'full',
  component: 'div',
})`
  width: ${({ width }) => width}px;
  height: 9px;
  position: relative;
`

export interface ProgressBarPercentProps {
  percent: number
}
export const ProgressBarLoaded = styled(Sprite).attrs<ProgressBarPercentProps>({
  sprite: 'progress',
  icon: 'loaded',
  component: 'div',
})`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ percent }) => percent}%;
  height: 100%;
`

export const ProgressBarCur = styled(Sprite).attrs<ProgressBarPercentProps>({
  sprite: 'progress',
  icon: 'cur',
  component: 'div',
})`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ percent }) => percent}%;
  height: 100%;
`

// Progress Bar Dragging Dot
export const ProgressBarDot = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'progressDot',
  component: 'span',
})`
  position: absolute;
  top: -7px;
  right: -13px;
  width: 22px;
  height: 24px;
  margin-left: -11px;
  cursor: pointer;
`
