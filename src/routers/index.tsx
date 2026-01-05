import { Navigate } from 'react-router-dom'

import { detailRouteBuilder, detailRoutes } from '@/modules/Detail/routes'
import { discoverRouteBuilder, discoverRoutes } from '@/modules/Discover/routes'
import { downloadRoutes } from '@/modules/Download/routes'
import { friendRoutes } from '@/modules/Friend/routes'
import { mineRoutes } from '@/modules/Mine/routes'

import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />,
  },
  discoverRoutes,
  mineRoutes,
  friendRoutes,
  downloadRoutes,
  detailRoutes,
]

export const routeBuilder = {
  ...discoverRouteBuilder,
  ...detailRouteBuilder,
}
