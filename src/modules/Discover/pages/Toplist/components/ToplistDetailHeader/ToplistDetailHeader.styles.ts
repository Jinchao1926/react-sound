import styled from 'styled-components'

import { Sprite } from '@/components/UI'

export const ToplistCover = styled.div`
  position: relative;
  padding: 3px;
  border: 1px solid #ccc;
  width: 150px;
  height: 150px;
`

export const ToplistCoverBright = styled(Sprite).attrs({
  sprite: 'cover',
  icon: 'bright150',
})`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 150px;
  height: 150px;
`
