import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import { OutletLayout } from '@/components/OutletLayout'

import { detailRoutePath } from './config'

const Song = lazy(() => import('../pages/Song'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Album = lazy(() => import('../pages/Album'))
const DJRadio = lazy(() => import('../pages/DJRadio'))
const Program = lazy(() => import('../pages/Program'))

export const detailRoutes: RouteObject = {
  path: '/',
  element: <OutletLayout />,
  children: [
    {
      path: detailRoutePath.playlist,
      element: <Playlist />,
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
      path: detailRoutePath.radio,
      element: <DJRadio />,
    },
    {
      path: detailRoutePath.program,
      element: <Program />,
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
