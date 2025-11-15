import styled from 'styled-components'

import { TextNavLink } from '@/components/UI'
import { Sprite } from '@/components/UI/Spirit'

export const PlaylistCategoryWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 35px;
  left: -40px;
  width: 720px;
`

export const PlaylistCategoryArrow = styled(Sprite).attrs({
  sprite: 'icon',
  icon: 'arrow',
})`
  position: absolute;
  top: 2px;
  left: 132px;
  width: 24px;
  height: 11px;
`

export const PlaylistCategoryHeader = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'header',
})`
  height: 32px;
`

export const PlaylistCategoryBody = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'body',
})`
  padding: 0 10px;

  dl {
    margin: 0;
    &:last-of-type {
      dd {
        padding-bottom: 25px;
      }
    }
    dt {
      float: left;
      display: inline-flex;
      align-items: center;
      width: 70px;
      margin: 0 -100px 0 26px;
      padding-top: 15px;
      font-weight: bold;
    }

    dd {
      margin-left: 96px;
      padding: 16px 15px 0 15px;
      border-left: 1px solid #e6e6e6;
      line-height: 24px;
    }
  }
`

export const PlaylistCategoryFooter = styled(Sprite).attrs({
  sprite: 'background',
  icon: 'footer',
})`
  height: 20px;
`

export const PlaylistCategoryAll = styled(Sprite).attrs({
  sprite: 'button',
  icon: 'greyButton',
  component: TextNavLink,
})`
  display: inline-block;
  width: 75px;
  height: 26px;
  line-height: 26px;
  text-align: center;
`

const icons = ['language', 'style', 'scene', 'emotion', 'theme']
export const PlaylistCategoryIcon = styled(Sprite).attrs(({ index }) => ({
  sprite: 'icon',
  icon: icons[index],
  component: 'i',
}))`
  width: 23px;
  height: 23px;
  margin: 0 8px 4px 0;
`

export const PlaylistCategoryItem = styled.div`
  display: inline-block;
  white-space: nowrap;
`

export const PlaylistCategoryLink = styled(TextNavLink)`
  display: inline-block;
  color: #333;

  &.selected {
    background: #a7a7a7;
    color: #fff;
    padding: 2px 6px;
  }
`
