import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Discover = lazy(() => import('@/pages/discover'))
const Mine = lazy(() => import('@/pages/mine'))
const Friend = lazy(() => import('@/pages/friend'))

const routes: RouteObject[] = [
  {
    path: '/',
    // element: <Discover />
    element: <Navigate to="/discover" />,
  },
  {
    path: '/discover',
    element: <Discover />,
  },
  {
    path: '/mine',
    element: <Mine />,
  },
  {
    path: '/friend',
    element: <Friend />,
  },
  // {
  //   path: '/page',
  //   element: <Page />,
  //   children: []
  // },
]

export default routes
