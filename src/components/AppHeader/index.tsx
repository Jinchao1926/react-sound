import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { NavLink } from 'react-router-dom'

import { headerLinks } from '@/assets/data/local-data'

import { AppHeaderWrapper, HeaderLeft, HeaderRight } from './style'

interface ITitleType {
  title: string
  type: string
  link: string
}

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  function showNavItem(item: ITitleType) {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else if (item.type === 'link') {
      return (
        <a href={item.link} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      )
    }
  }

  return (
    <AppHeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo-app sprite_01" href="#/">
            网易云音乐
          </a>
          <div className="nav-list">
            {headerLinks.map((item) => {
              return (
                <div className="nav-item" key={item.title}>
                  {showNavItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined twoToneColor="#9b9b9b" />}
          ></Input>
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </AppHeaderWrapper>
  )
}

export default memo(AppHeader)
