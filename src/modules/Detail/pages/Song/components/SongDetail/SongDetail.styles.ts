import styled from 'styled-components'

import { Flex } from '@/components/Core'
import { Sprite } from '@/components/Core/Spirit/Sprite'

export const SongDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SongCD = styled.div`
  width: 198px;
  height: 198px;
  position: relative;

  img {
    width: 130px;
    height: 130px;
    margin: 34px;
  }
`

export const SongCDCover = styled(Sprite).attrs({
  sprite: 'cover',
  icon: 'CD',
})`
  position: absolute;
  width: 206px;
  height: 205px;
  top: -4px;
  left: -4px;
  background-position: -140px -580px;
`

export const OpenClientButton = styled.button`
  margin: 10px 0 0 12px;
  width: 176px;
  height: 35px;
  color: #283248;
  background-color: rgba(40, 50, 72, 0.03);
  border: solid 1px rgba(40, 50, 72, 0.25);
  border-radius: 6px;
`

export const SongLink = styled(Flex)`
  align-items: center;
  margin: 10px 0;
  color: #999;
`
