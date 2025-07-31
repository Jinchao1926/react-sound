import React from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { detailRoutes } from '@/modules/Detail/routes'
import { discoverRoutes } from '@/modules/Discover/routes'
import { downloadRoutes } from '@/modules/Downloads/routes'
import { friendRoutes } from '@/modules/Friends/routes'
import { mineRoutes } from '@/modules/Mines/routes'

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
