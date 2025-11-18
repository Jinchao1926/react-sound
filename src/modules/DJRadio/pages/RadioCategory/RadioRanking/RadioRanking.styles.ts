import styled from 'styled-components'

import { Sprite } from '@/components/UI'

export const RadioList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const RadioItem = styled.div`
  display: flex;
  width: 435px;
  height: 120px;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
`

export const RadioName = styled.h3`
  margin: 0;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
`

export const RadioCreatorIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'people',
  component: 'span',
})`
  display: inline-block;
  width: 14px;
  height: 15px;
`
