import { lazy } from 'react'

import { radioRoutePath } from './config'

import type { RouteObject } from 'react-router'

// DJRadio 主组件
const DJRadio = lazy(() => import('../index'))

// DJRadio 子页面组件
const Podcast = lazy(() => import('../pages/Radio'))
const ProgramRecommend = lazy(() => import('../pages/ProgramRecommend'))
const ProgramRanking = lazy(() => import('../pages/ProgramRanking'))
const RadioCategory = lazy(() => import('../pages/RadioCategory'))

export const djRadioRoutes: RouteObject = {
  path: radioRoutePath.discoverRadio,
  element: <DJRadio />,
  children: [
    {
      path: radioRoutePath.discoverRadio,
      element: <Podcast />,
    },
    {
      path: radioRoutePath.discoverRadioRecommend,
      element: <ProgramRecommend />,
    },
    {
      path: radioRoutePath.discoverRadioRank,
      element: <ProgramRanking />,
    },
    {
      path: radioRoutePath.discoverRadioCategory,
      element: <RadioCategory />,
    },
  ],
}

export { radioRouteBuilder } from './config'
