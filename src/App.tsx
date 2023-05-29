import React, { Suspense, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from '@/routers'

import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import Player from '@/pages/player'

interface IProps {
  children?: ReactNode
}

const App: FC<IProps> = () => {
  return (
    <div>
      <AppHeader />
      <Suspense fallback="">
        <div>{ useRoutes(routes) }</div>
      </Suspense>
      <AppFooter />
      <Player />
    </div>
  )
}

export default memo(App)