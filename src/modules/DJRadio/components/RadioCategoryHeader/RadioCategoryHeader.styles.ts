import styled from 'styled-components'

import { Sprite } from '@/components/Core/Spirit'

export const RadioCategoryHeaderWrapper = styled.div`
  position: relative;

  .dots {
    bottom: 8px;
  }
`

export const RadioCategoryPage = styled.div`
  display: flex !important;
  flex-wrap: wrap;
`

export const ArrowLeft = styled(Sprite).attrs({
  sprite: 'radio',
  icon: 'arrowLeft',
  component: 'button',
})`
  position: absolute;
  top: 50%;
  left: -26px;
  margin-top: -15px;
  width: 20px;
  height: 30px;
  opacity: 0.25;

  &:hover {
    opacity: 0.5;
  }
  &[disabled] {
    opacity: 0.08;
  }
`

export const ArrowRight = styled(Sprite).attrs({
  sprite: 'radio',
  icon: 'arrowRight',
  component: 'button',
})`
  position: absolute;
  top: 50%;
  right: -26px;
  margin-top: -15px;
  width: 20px;
  height: 30px;
  opacity: 0.25;

  &:hover {
    opacity: 0.5;
  }
  &[disabled] {
    opacity: 0.08;
  }
`
