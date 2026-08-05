import { lazy } from 'react'

import type { RouteObject } from 'react-router'

// Download 模块页面组件
const Download = lazy(() => import('../index'))

export const downloadRoutes: RouteObject = {
  path: '/download',
  element: <Download />,
}
