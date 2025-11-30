import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import { radiorRoutePath } from './config'

// DJRadio 主组件
const DJRadio = lazy(() => import('../index'))

// DJRadio 子页面组件
const Podcast = lazy(() => import('../pages/Radio'))
const ProgramRecommend = lazy(() => import('../pages/ProgramRecommend'))
const ProgramRanking = lazy(() => import('../pages/ProgramRanking'))
const RadioCategory = lazy(() => import('../pages/RadioCategory'))

export const djRadioRoutes: RouteObject = {
  path: radiorRoutePath.discoverRadio,
  element: <DJRadio />,
  children: [
    {
      path: radiorRoutePath.discoverRadio,
      element: <Podcast />,
    },
    {
      path: radiorRoutePath.discoverRadioRecommend,
      element: <ProgramRecommend />,
    },
    {
      path: radiorRoutePath.discoverRadioRank,
      element: <ProgramRanking />,
    },
    {
      path: radiorRoutePath.discoverRadioCategory,
      element: <RadioCategory />,
    },
  ],
}

export { radioRouteBuilder } from './config'
