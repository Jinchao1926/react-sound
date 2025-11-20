import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import { OutletLayout } from '@/components/OutletLayout'

const Song = lazy(() => import('../pages/Song'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Album = lazy(() => import('../pages/Album'))

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
      element: <Album />,
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
