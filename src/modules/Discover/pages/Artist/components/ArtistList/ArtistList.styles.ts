import styled from 'styled-components'

import { Sprite } from '@/components/Core'

export const UserIcon = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'user',
  component: 'span',
})`
  display: inline-block;
  width: 17px;
  height: 18px;
`

export const DashedDivider = styled.div`
  margin: 0 0 12px -17px;
  height: 1px;
  width: calc(100% + 17px);
  border-bottom: 1px dashed #ccc;
`
