import React, { Suspense, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { DiscoverWrapper } from './style'
import { discoverMenu } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

// 发现音乐
const Discover: FC<IProps> = () => {
  return (
    <DiscoverWrapper>
      <div className="top">
        <div className="nav-list wrap-v1">
          {discoverMenu.map((item) => {
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
