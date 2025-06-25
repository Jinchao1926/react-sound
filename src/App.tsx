import React, { Suspense, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { useRoutes } from 'react-router-dom'

import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import LockablePlayer from '@/pages/player'
import routes from '@/routers'

interface IProps {
  children?: ReactNode
}

const App: FC<IProps> = () => {
  return (
    <div>
      <AppHeader />
      {/* 懒加载后需要 Suspense */}
      <Suspense fallback="">
        <div>{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <LockablePlayer />
    </div>
  )
}

export default memo(App)
