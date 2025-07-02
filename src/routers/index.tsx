import React, { lazy } from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

// 一级路由
const Discover = lazy(() => import('@/pages/discover'))
const Mine = lazy(() => import('@/pages/mine'))
const Friend = lazy(() => import('@/pages/friend'))
const Download = lazy(() => import('@/pages/download'))

// Discover 二级路由
const Recommend = lazy(() => import('@/pages/discover/components/recommend'))
const Ranking = lazy(() => import('@/pages/discover/components/ranking'))
const Playlist = lazy(() => import('@/pages/discover/components/playlist'))
const DJRadio = lazy(() => import('@/pages/discover/components/djradio'))
const Artist = lazy(() => import('@/pages/discover/components/artist'))
const Album = lazy(() => import('@/pages/discover/components/album'))
const Song = lazy(() => import('@/pages/song'))

// Discover - DJRadio 三级路由
const DJRadioProgram = lazy(
  () => import('@/pages/discover/components/djradio/c-pages/program')
)
const DJRadioCategory = lazy(
  () => import('@/pages/discover/components/djradio/c-pages/category')
)
const DJRadioRecommend = lazy(
  () => import('@/pages/discover/components/djradio/c-pages/program-recommend')
)
const DJRadioRanking = lazy(
  () => import('@/pages/discover/components/djradio/c-pages/program-ranking')
)

const routes: RouteObject[] = [
  {
    path: '/',
    // element: <Discover />
    element: <Navigate to="/discover" />,
  },
  {
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
  },
  {
    path: '/mine',
    element: <Mine />,
  },
  {
    path: '/friend',
    element: <Friend />,
  },
  {
    path: '/download',
    element: <Download />,
  },
]

export default routes
