import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { DJRadioWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const DJRadio: FC<IProps> = () => {
  return (
    <DJRadioWrapper className='wrap-v2'>
      <Suspense fallback="">
        {/* 用于定义子路由器的渲染位置 */}
        <Outlet />
      </Suspense>
    </DJRadioWrapper>
  )
}

export default memo(DJRadio)