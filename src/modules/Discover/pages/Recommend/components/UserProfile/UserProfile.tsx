import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { UserProfileWrapper } from './UserProfile.styles'

export const UserProfile: FC = () => {
  return (
    <UserProfileWrapper className="sprite_02">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <NavLink to="/login">
        <button className="sprite_02">用户登录</button>
      </NavLink>
    </UserProfileWrapper>
  )
}
