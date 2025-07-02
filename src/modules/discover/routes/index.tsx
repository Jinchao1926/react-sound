import { lazy } from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

// Discover 模块页面组件
const Discover = lazy(() => import('../index'))
const Recommend = lazy(() => import('../pages/recommend'))
const Ranking = lazy(() => import('../pages/ranking'))
const Playlist = lazy(() => import('../pages/playlist'))
const DJRadio = lazy(() => import('../pages/djradio'))
const Artist = lazy(() => import('../pages/artist'))
const Album = lazy(() => import('../pages/album'))
const Song = lazy(() => import('../../song'))

// DJRadio 三级路由组件
const DJRadioProgram = lazy(() => import('../pages/djradio/components/program'))
const DJRadioCategory = lazy(
  () => import('../pages/djradio/components/category')
)
const DJRadioRecommend = lazy(
  () => import('../pages/djradio/components/program-recommend')
)
const DJRadioRanking = lazy(
  () => import('../pages/djradio/components/program-ranking')
)

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
      path: '/discover/ranking',
      element: <Ranking />,
    },
    {
      path: '/discover/playlist',
      element: <Playlist />,
    },
    {
      path: '/discover/djradio',
      element: <DJRadio />,
      children: [
        {
          path: '/discover/djradio',
          element: <Navigate to="/discover/djradio/program" />,
        },
        {
          path: '/discover/djradio/program',
          element: <DJRadioProgram />,
        },
        {
          path: '/discover/djradio/category',
          element: <DJRadioCategory />,
        },
        {
          path: '/discover/djradio/recommend',
          element: <DJRadioRecommend />,
        },
        {
          path: '/discover/djradio/ranking',
          element: <DJRadioRanking />,
        },
      ],
    },
    {
      path: '/discover/artist',
      element: <Artist />,
    },
    {
      path: '/discover/album',
      element: <Album />,
    },
    {
      path: '/discover/song',
      element: <Song />,
    },
  ],
}
