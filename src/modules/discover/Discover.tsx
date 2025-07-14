import React, { FC, Suspense, memo } from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { discoverNavigations } from '@/constants/navigation'

import { DiscoverWrapper } from './Discover.styles'

// 发现音乐
const Discover: FC = () => {
  return (
    <DiscoverWrapper>
      <div className="top">
        <div className="nav-list wrap-v1">
          {discoverNavigations.map((item) => (
            <div className="nav-item" key={item.title}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          ))}
        </div>
      </div>
      <Suspense fallback="">
        {/* 用于定义子路由器的渲染位置 */}
        <Outlet />
      </Suspense>
    </DiscoverWrapper>
  )
}

export default memo(Discover)
