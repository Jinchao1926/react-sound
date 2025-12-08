import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import { OutletLayout } from '@/components/OutletLayout'

import { detailRoutePath } from './config'

const Song = lazy(() => import('../pages/Song'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Album = lazy(() => import('../pages/Album'))
const DJRadio = lazy(() => import('../pages/DJRadio'))
const Program = lazy(() => import('../pages/Program'))
const MV = lazy(() => import('../pages/MV'))
const Artist = lazy(() => import('../pages/Artist'))

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
    {
      path: detailRoutePath.artist,
      element: <Artist />,
    },
    {
      path: detailRoutePath.user,
      element: <Song />,
    },
  ],
}

export { detailRouteBuilder } from './config'
