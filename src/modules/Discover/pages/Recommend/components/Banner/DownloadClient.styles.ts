import styled from 'styled-components'

import { Sprite } from '@/components/UI/Spirit/Sprite'

export const DownloadClientBG = styled(Sprite).attrs({
  sprite: 'downloadBG',
  icon: 'bg',
  component: 'div',
})`
  position: relative;
  width: 254px;
  height: 100%;
`
export const DownloadClientButton = styled(Sprite).attrs({
  sprite: 'downloadBG',
  icon: 'button',
  component: 'a',
})`
  display: block;
  margin: 186px 0 0 19px;
  width: 215px;
  height: 56px;
`

export const DownloadClientDesc = styled.p`
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  margin: 10px auto;
  text-align: center;
  color: #8d8d8d;
`
