import { lazy } from 'react'

import { OutletLayout } from '@/components/OutletLayout'

import { detailRoutePath } from './config'
import { artistRoutes } from '../pages/Artist/routes'

import type { RouteObject } from 'react-router'

const Song = lazy(() => import('../pages/Song'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Album = lazy(() => import('../pages/Album'))
const DJRadio = lazy(() => import('../pages/DJRadio'))
const Program = lazy(() => import('../pages/Program'))
const MV = lazy(() => import('../pages/MV'))
const User = lazy(() => import('../pages/User'))

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
      element: <MV />,
    },
    artistRoutes,
    {
      path: detailRoutePath.user,
      element: <User />,
    },
  ],
}

export { detailRouteBuilder } from './config'
