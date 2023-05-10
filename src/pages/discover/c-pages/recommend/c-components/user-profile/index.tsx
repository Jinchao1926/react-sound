import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { UserProfileWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const UserProfile: FC<IProps> = () => {
  return (
    <UserProfileWrapper className='sprite_02'>
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      {/* <a className='sprite_02' href='/login'>用户登录</a> */}
      <NavLink to='/login'>
        <button className='sprite_02'>用户登录</button>
      </NavLink>
    </UserProfileWrapper>
  )
}

export default memo(UserProfile)