import React from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { discoverRoutes } from '@/modules/discover/routes'
import { downloadRoutes } from '@/modules/download/routes'
import { friendRoutes } from '@/modules/friend/routes'
import { mineRoutes } from '@/modules/mine/routes'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />,
  },
  discoverRoutes,
  mineRoutes,
  friendRoutes,
  downloadRoutes,
]

export default routes
