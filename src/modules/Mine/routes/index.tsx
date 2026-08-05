import { lazy } from 'react'

import type { RouteObject } from 'react-router'

// Mine 模块页面组件
const Mine = lazy(() => import('../index'))

export const mineRoutes: RouteObject = {
  path: '/mine',
  element: <Mine />,
}

export const mineRouteBuilder = {
  mine: () => '/mine',
}
