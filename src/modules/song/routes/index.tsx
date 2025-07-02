import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

// Friend 模块页面组件
const Song = lazy(() => import('../index'))

export const songRoutes: RouteObject = {
  path: '/song',
  element: <Song />,
}
