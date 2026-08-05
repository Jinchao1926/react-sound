import { lazy } from 'react'

import { artistRoutePath } from './config'

import type { RouteObject } from 'react-router'

// Artist 主组件
const Artist = lazy(() => import('../index'))

// Artist 子页面组件
const ArtistSongs = lazy(() => import('../components/ArtistSongs'))
const ArtistAlbums = lazy(() => import('../components/ArtistAlbums'))
const ArtistMVs = lazy(() => import('../components/ArtistMVs'))
const ArtistIntroduction = lazy(
  () => import('../components/ArtistIntroduction')
)

export const artistRoutes: RouteObject = {
  path: artistRoutePath.artist,
  element: <Artist />,
  children: [
    {
      path: artistRoutePath.artist,
      element: <ArtistSongs />,
    },
    {
      path: artistRoutePath.artistAlbum,
      element: <ArtistAlbums />,
    },
    {
      path: artistRoutePath.artistMV,
      element: <ArtistMVs />,
    },
    {
      path: artistRoutePath.artistDesc,
      element: <ArtistIntroduction />,
    },
  ],
}

export { artistRoutePath } from './config'
