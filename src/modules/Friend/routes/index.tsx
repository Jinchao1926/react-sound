import { lazy } from 'react'

import type { RouteObject } from 'react-router'

// Friend 模块页面组件
const Friend = lazy(() => import('../index'))

export const friendRoutes: RouteObject = {
  path: '/friend',
  element: <Friend />,
}
