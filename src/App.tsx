import { type FC, Suspense } from 'react'

import { useRoutes } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { StickyPlayerBar } from '@/modules/StickyPlayerBar'
import { routes } from '@/routers'

export const App: FC = () => {
  return (
    <div>
      <AppHeader />
      {/* 懒加载后需要 Suspense */}
      <Suspense fallback="">
        <div>{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <StickyPlayerBar />
    </div>
  )
}
