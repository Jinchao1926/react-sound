import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { FriendLoginWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const FriendLogin: FC<IProps> = () => {
  function handleLogin() {
    console.log("Login")
  }

  return (
    <FriendLoginWrapper className='wrap-v2'>
      <div className='background'>
        <div className='tips'>
          你可以关注明星和好友品味他们的私房歌单
          <br />
          通过他们的动态发现更多精彩音乐
        </div>
        <a className='login' href='/#' onClick={e => {e.preventDefault(); handleLogin()}}>立即登录</a>
      </div>
    </FriendLoginWrapper>
  )
}

export default memo(FriendLogin)