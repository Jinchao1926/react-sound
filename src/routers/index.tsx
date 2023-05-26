import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

// Discover-related page
const Discover = lazy(() => import('@/pages/discover'))
const Recommend = lazy(() => import('@/pages/discover/c-pages/recommend'))
const Ranking = lazy(() => import('@/pages/discover/c-pages/ranking'))
const Playlist = lazy(() => import('@/pages/discover/c-pages/playlist'))
const DJRadio = lazy(() => import('@/pages/discover/c-pages/djradio'))
const Artist = lazy(() => import('@/pages/discover/c-pages/artist'))
const Album = lazy(() => import('@/pages/discover/c-pages/album'))
const Player = lazy(() => import('@/pages/player'))

const Mine = lazy(() => import('@/pages/mine'))
const Friend = lazy(() => import('@/pages/friend'))

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
        element: <Player />,
      },
    ]
  },
  {
    path: '/mine',
    element: <Mine />,
  },
  {
    path: '/friend',
    element: <Friend />,
  },
]

export default routes
