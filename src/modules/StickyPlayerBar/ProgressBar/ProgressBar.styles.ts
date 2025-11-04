import styled from 'styled-components'

import { Sprite } from '@/components/UI/Spirit/Sprite'

export const ProgressBarWrapper = styled.div`
  width: 466px;
  height: 9px;
  position: relative;
  background-position: right 0;

  .full {
    width: 100%;
    height: 100%;
    background-position: right -30px;
  }
  .cur {
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background-position: left -66px;
  }
`

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
