import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Box } from '@/components/Core'

import {
  LoginButton,
  LoginDesc,
  UserProfileBG,
  VipImage,
} from './UserProfile.styles'

export const UserProfile: FC = () => {
  return (
    <Box>
      <VipImage
        src={require('@/assets/img/dis_vip_card.png')}
        alt="user-profile"
      />
      <UserProfileBG>
        <LoginDesc>
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </LoginDesc>
        <NavLink to="/login">
          <LoginButton>用户登录</LoginButton>
        </NavLink>
      </UserProfileBG>
    </Box>
  )
}
