import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

// Friend 模块页面组件
const Friend = lazy(() => import('../index'))

export const friendRoutes: RouteObject = {
  path: '/friend',
  element: <Friend />,
}
