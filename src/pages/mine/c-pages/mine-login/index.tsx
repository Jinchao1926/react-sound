import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { MineLoginWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const MineLogin: FC<IProps> = () => {
  function handleLogin() {
    console.log("Login")
  }

  return (
    <MineLoginWrapper className='wrap-v2'>
      <div className='background'>
        <a className='login' href='/#' onClick={e => {e.preventDefault(); handleLogin()}}>立即登录</a>
      </div>
    </MineLoginWrapper>
  )
}

export default memo(MineLogin)