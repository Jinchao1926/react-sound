import React, { FC, Suspense, memo } from 'react'

import { Outlet } from 'react-router-dom'

import { DJRadioWrapper } from './DJRadio.styles'

const DJRadio: FC = () => {
  return (
    <DJRadioWrapper className="wrap-v2">
      <Suspense fallback="">
        {/* 用于定义子路由器的渲染位置 */}
        <Outlet />
      </Suspense>
    </DJRadioWrapper>
  )
}

export default memo(DJRadio)
