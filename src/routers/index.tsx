import React from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { discoverRoutes } from '@/modules/Discover/routes'
import { downloadRoutes } from '@/modules/Download/routes'
import { friendRoutes } from '@/modules/Friend/routes'
import { mineRoutes } from '@/modules/Mine/routes'
import { songRoutes } from '@/modules/Song/routes'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />,
  },
  discoverRoutes,
  mineRoutes,
  friendRoutes,
  downloadRoutes,
  songRoutes,
]

export default routes
