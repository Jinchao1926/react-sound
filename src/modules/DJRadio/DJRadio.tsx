import React, { FC, Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { DJRadioWrapper } from './DJRadio.styles'

export const DJRadio: FC = () => {
  return (
    <DJRadioWrapper className="wrap-v2">
      <Suspense fallback="">
        {/* 用于定义子路由器的渲染位置 */}
        <Outlet />
      </Suspense>
    </DJRadioWrapper>
  )
}
