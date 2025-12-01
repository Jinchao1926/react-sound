import styled from 'styled-components'

import { Sprite, Text } from '../Core'

export const GreyButtonWrapper = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'greyRightBG',
  component: 'button',
})`
  height: 31px;
  padding: 0 5px 0 0;
`

export interface GreyButtonContentProps {
  width?: number
  padding?: string
  color?: string
}

export const GreyButtonText = styled(Sprite).attrs({
  sprite: 'button',
  component: 'span',
})<GreyButtonContentProps>`
  display: inline-block;
  height: 100%;
  line-height: 30px;
  min-width: 23px;
  width: ${(props) =>
    props.width !== undefined ? `${props.width}px` : 'auto'};
  padding: ${(props) => props.padding || '0 2px 0 28px'};
  color: ${(props) => props.color || 'inherit'};
  font-family: simsun, 宋体;
`

export const GreyButtonSpan = styled(Text)`
  display: inline-block;
  height: 100%;
  line-height: 30px;
  min-width: 23px;
  width: ${(props) =>
    props.width !== undefined ? `${props.width}px` : 'auto'};
  padding: ${(props) => props.padding || '0 2px 0 28px'};
  color: ${(props) => props.color || 'inherit'};
  font-family: simsun, 宋体;
`
