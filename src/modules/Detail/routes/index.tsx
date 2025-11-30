import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import { OutletLayout } from '@/components/OutletLayout'

import { detailRoutePath } from './config'

const Song = lazy(() => import('../pages/Song'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Album = lazy(() => import('../pages/Album'))

export const detailRoutes: RouteObject = {
  path: '/',
  element: <OutletLayout />,
  children: [
    {
      path: detailRoutePath.playlist,
      element: <Playlist />,
    },
    {
      path: detailRoutePath.program,
      element: <Song />,
    },
    {
      path: detailRoutePath.album,
      element: <Album />,
    },
    {
      path: detailRoutePath.song,
      element: <Song />,
    },
    {
      path: detailRoutePath.mv,
      element: <Song />,
    },
    {
      path: detailRoutePath.artist,
      element: <Song />,
    },
    {
      path: detailRoutePath.user,
      element: <Song />,
    },
  ],
}

export { detailRouteBuilder } from './config'
