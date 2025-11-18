import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import { OutletLayout } from '@/components/OutletLayout'

const Song = lazy(() => import('../pages/Song'))
const Playlist = lazy(() => import('../pages/Playlist'))

export const detailRoutes: RouteObject = {
  path: '/',
  element: <OutletLayout />,
  children: [
    {
      path: '/playlist',
      element: <Playlist />,
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
  ],
}
