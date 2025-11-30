import { lazy } from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

import {
  discoverRouteBuilder as rawDiscoverRouteBuilder,
  discoverRoutePath,
} from './config'
import { djRadioRoutes, radioRouteBuilder } from '../../DJRadio/routes'

// Discover 模块页面组件
const Discover = lazy(() => import('../index'))

const Recommend = lazy(() => import('../pages/Recommend'))
const Toplist = lazy(() => import('../pages/Toplist'))
const Playlist = lazy(() => import('../pages/Playlist'))
const Artist = lazy(() => import('../pages/Artist'))
const Album = lazy(() => import('../pages/Album'))

export const discoverRoutes: RouteObject = {
  path: discoverRoutePath.discover,
  element: <Discover />,
  children: [
    {
      path: discoverRoutePath.discover,
      element: <Navigate to={discoverRoutePath.discoverRecommend} />,
    },
    {
      path: discoverRoutePath.discoverRecommend,
      element: <Recommend />,
    },
    {
      path: discoverRoutePath.discoverToplist,
      element: <Toplist />,
    },
    {
      path: discoverRoutePath.discoverPlaylist,
      element: <Playlist />,
    },
    djRadioRoutes,
    {
      path: discoverRoutePath.discoverArtist,
      element: <Artist />,
    },
    {
      path: discoverRoutePath.discoverAlbum,
      element: <Album />,
    },
  ],
}

export const discoverRouteBuilder = {
  ...rawDiscoverRouteBuilder,
  ...radioRouteBuilder,
}
