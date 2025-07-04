import React, { Suspense, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { discoverNavigations } from '@/constants/navigation'

import { DiscoverWrapper } from './style'

interface IProps {
  children?: ReactNode
}

// 发现音乐
const Discover: FC<IProps> = () => {
  return (
    <DiscoverWrapper>
      <div className="top">
        <div className="nav-list wrap-v1">
          {discoverNavigations.map((item) => {
            return (
              <div className="nav-item" key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })}
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
