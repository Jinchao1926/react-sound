import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

const Song = lazy(() => import('../pages/Song'))

export const detailRoutes: RouteObject[] = [
  {
    path: '/playlist',
    element: <Song />,
  },
  {
    path: '/program',
    element: <Song />,
  },
  {
    path: '/album',
    element: <Song />,
  },
  {
    path: '/song',
    element: <Song />,
  },
  {
    path: '/mv',
    element: <Song />,
  },
  {
    path: '/user/home',
    element: <Song />,
  },
]
