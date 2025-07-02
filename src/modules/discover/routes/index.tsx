import { lazy } from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import { djRadioRoutes } from '../../DJRadio/routes'

// Discover 模块页面组件
const Discover = lazy(() => import('../index'))

const Recommend = lazy(() => import('../pages/Recommend'))
const Toplist = lazy(() => import('../pages/Toplist'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Artist = lazy(() => import('../pages/Artist'))
const Album = lazy(() => import('../pages/Album'))

export const discoverRoutes: RouteObject = {
  path: '/discover',
  element: <Discover />,
  children: [
    {
      path: '/discover',
      element: <Navigate to="/discover/recommend" />,
    },
    {
      path: '/discover/recommend',
      element: <Recommend />,
    },
    {
      path: '/discover/toplist',
      element: <Toplist />,
    },
    {
      path: '/discover/playlist',
      element: <Playlist />,
    },
    djRadioRoutes,
    {
      path: '/discover/artist',
      element: <Artist />,
    },
    {
      path: '/discover/album',
      element: <Album />,
    },
  ],
}
