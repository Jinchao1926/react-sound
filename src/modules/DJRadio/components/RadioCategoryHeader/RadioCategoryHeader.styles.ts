import styled from 'styled-components'

import { Sprite } from '@/components/Core/Spirit'

export const RadioCategoryHeaderWrapper = styled.div`
  position: relative;

  .dots {
    bottom: 0px;
    li {
      margin: 0 1px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #aaa;
      }
    }

    li.slick-active {
      button {
        background-color: #c20c0c;
      }
    }
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
