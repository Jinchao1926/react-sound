import React, { FC, Suspense, memo } from 'react'

import { useRoutes } from 'react-router-dom'

import AppFooter from '@/components/app-footer'
import AppHeader from '@/components/app-header'
import LockablePlayer from '@/pages/player'
import routes from '@/routers'

const App: FC = () => {
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
