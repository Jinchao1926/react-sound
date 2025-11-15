import styled from 'styled-components'

import { Sprite } from '@/components/UI/Spirit'

export const PlaylistHeaderWrapper = styled.div`
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  justify-content: space-between;
`

export const CategoryButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'category',
  component: 'button',
})`
  margin: 2px 0 0 12px;
  padding: 0 5px 0 0;
  height: 31px;
  line-height: 31px;
`

export const CategoryButtonText = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'categoryRightConer',
  component: 'span',
})`
  display: inline-block;
  width: 86px;
  height: 100%;
  line-height: 30px;
  padding-left: 5px;
  box-sizing: border-box;
  color: #0c73c2;
`

export const ArrowDown = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'arrowDown',
  component: 'i',
})`
  display: inline-block;
  margin: 0 0 1px 5px;
  width: 8px;
  height: 5px;
`

export const HotButton = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'redButton',
  component: 'button',
})`
  width: 46px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  border-radius: 3px;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`
