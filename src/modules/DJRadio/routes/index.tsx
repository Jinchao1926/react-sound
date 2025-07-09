import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

// DJRadio 主组件
const DJRadio = lazy(() => import('../index'))

// DJRadio 子页面组件
const Podcast = lazy(() => import('../pages/Radio'))
const ProgramRecommend = lazy(() => import('../pages/ProgramRecommend'))
const ProgramRanking = lazy(() => import('../pages/ProgramRanking'))
const RadioCategory = lazy(() => import('../pages/RadioCategory'))

export const djRadioRoutes: RouteObject = {
  path: '/discover/djradio',
  element: <DJRadio />,
  children: [
    {
      path: '/discover/djradio',
      element: <Podcast />,
    },
    {
      path: '/discover/djradio/recommend',
      element: <ProgramRecommend />,
    },
    {
      path: '/discover/djradio/ranking',
      element: <ProgramRanking />,
    },
    {
      path: '/discover/djradio/category',
      element: <RadioCategory />,
    },
  ],
}
