import React, { FC, Suspense, memo } from 'react'

import { useRoutes } from 'react-router-dom'

import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import LockablePlayer from '@/modules/player'
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
