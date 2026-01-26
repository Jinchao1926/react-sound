import { type FC, Suspense } from 'react'

import { Helmet } from 'react-helmet-async'
import { useRoutes } from 'react-router-dom'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { StickyPlayerBar } from '@/modules/StickyPlayerBar'
import { routes } from '@/routers'

import { useRouteChange } from './hooks/useRouteChange'

export const App: FC = () => {
  useRouteChange()

  return (
    <ErrorBoundary>
      <Helmet>
        <title>React Sound</title>
      </Helmet>
      <div>
        <AppHeader />
        {/* 懒加载后需要 Suspense */}
        <Suspense fallback="">
          <div>{useRoutes(routes)}</div>
        </Suspense>
        <AppFooter />
        <StickyPlayerBar />
      </div>
    </ErrorBoundary>
  )
}
