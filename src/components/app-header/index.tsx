import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { 
  HeaderWrapper, 
  HeaderLeft, 
  HeaderRight 
} from './style'

import { headerLinks } from '@/assets/data/local-data'

interface ITitleType {
  title: string,
  type: string,
  link: string,
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
          <i className='icon sprite_01'></i>
        </NavLink>
      )
    } else if (item.type === 'link') {
      return <a href={item.link}>{item.title}</a>
    }
  }

  return (
    <HeaderWrapper>
      <div className='content wrap-v1'>
        <HeaderLeft>
          <a href='#/' className='logo sprite_01'></a>
          <div className='nav-list'>
            {
              headerLinks.map((item) => {
                return (
                  <div className='nav-item' key={item.title}>
                  { showNavItem(item) }
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input 
            className='search' 
            placeholder='音乐/视频/电台/用户' 
            prefix={<SearchOutlined twoToneColor='#9b9b9b'/>}>
          </Input>
          <div className='center'>创作者中心</div>
          <div className='login'>登录</div>
        </HeaderRight>
      </div>
      <div className='divider'></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)