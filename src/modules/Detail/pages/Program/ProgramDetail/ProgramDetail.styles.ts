import styled from 'styled-components'

import { Sprite } from '@/components/Core'

export const RadioIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'radioIcon',
  component: 'span',
})`
  width: 16px;
  height: 17px;
`

export const RadioName = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 35px;
  margin-left: 10px;
  white-space: pre;
`

export const SubscribeButton = styled.button`
  margin-left: 10px;
  padding: 0 12px 0 10px;
  height: 28px;
  color: #333;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  &:hover {
    background-color: #f7f6f6;
  }
`

export const StarredIcon = styled(Sprite).attrs<{ $starred: boolean }>(
  (props) => ({
    sprite: 'icon',
    icon: props.$starred ? 'starred' : 'star',
    component: 'span',
  })
)`
  display: inline-block;
  width: 14px;
  height: 14px;
  transform: translateY(2px);
  margin-right: 4px;
`
