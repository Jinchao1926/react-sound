import { Input } from 'antd'
import styled from 'styled-components'

import { Sprite } from '../Core'

export const AppHeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  border-bottom: 1px #000;
  font-size: 14px;
  color: #fff;
`

export const RedTriangle = styled(Sprite).attrs({
  sprite: 'header',
  icon: 'redTriangle',
  component: 'i',
})`
  position: absolute;
  display: none; // 默认隐藏
  width: 12px;
  height: 7px;
  bottom: -1px;
  left: 50%; // 元素左边距位于父元素中心
  transform: translate(-50%, 0); // 元素左移自身宽度的一半
`

export const AppNavigationItem = styled.div`
  position: relative;

  a {
    display: block;
    padding: 0 19px;
    color: #ccc;
  }

  &:hover a,
  .active {
    background-color: #000;
    color: #fff;
  }

  // red triangle - only appear when active
  .active ${RedTriangle} {
    display: inline-block;
  }
`

export const HeaderLogo = styled(Sprite).attrs({
  sprite: 'header',
  icon: 'logo',
  component: 'a',
})`
  width: 156px;
  height: 100%;
  padding-right: 20px;
  // SEO Optimize without text display
  text-indent: -9999px;
`

export const Search = styled(Input)`
  width: 158px;
  height: 32px;
  border-radius: 32px;

  input {
    &::placeholder {
      font-size: 12px;
      color: #9b9b9b;
    }
  }
`

export const CreatorCenter = styled.a`
  width: 88px;
  height: 30px;
  line-height: 30px;
  border-radius: 30px;
  cursor: pointer;

  color: #ccc;
  border: 1px solid #4f4f4f;
  &:hover {
    color: #fff;
    border: 1px solid #fff;
  }
`
