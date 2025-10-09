import { Carousel } from 'antd'
import styled from 'styled-components'

import { Flex, Sprite } from '@/components/UI'

export const NewAlbumContent = styled(Flex)`
  justify-content: center;
  height: 186px;
  margin: 20px 0 37px;
  background: #f5f5f5;
  border: 1px solid #d3d3d3;
`

export const AlbumList = styled(Carousel)`
  width: 645px;
  height: 180px;
  margin-top: 28px;
  padding-left: 10px;
  box-sizing: border-box;
`

export const AlbumPage = styled.div`
  display: flex !important;
  justify-content: space-between;
`

export const Left = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'arrowLeft',
  component: 'button',
})`
  margin-top: 71px;
  width: 20px;
  height: 20px;
`

export const Right = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'arrowRight',
  component: 'button',
})`
  margin-top: 71px;
  width: 20px;
  height: 20px;
`
