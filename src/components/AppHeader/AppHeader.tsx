import type { FC } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { NavLink } from 'react-router-dom'

import { rootNavigations } from '@/constants/navigation'

import {
  AppHeaderWrapper,
  AppNavigationItem,
  HeaderLeft,
  HeaderRight,
} from './AppHeader.styles'
import { Flex, FlexContainer } from '../UI'

export const AppHeader: FC = () => {
  return (
    <AppHeaderWrapper>
      <FlexContainer variant="large">
        <HeaderLeft>
          <a className="logo-app sprite_01" href="#/">
            网易云音乐
          </a>
          <Flex justify="space-between" lineHeight={70}>
            {rootNavigations.map((item) => (
              <AppNavigationItem key={item.title}>
                {item.type === 'path' ? (
                  <NavLink to={item.link}>
                    {item.title}
                    <i className="icon sprite_01" />
                  </NavLink>
                ) : (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                )}
              </AppNavigationItem>
            ))}
          </Flex>
        </HeaderLeft>

        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined twoToneColor="#9b9b9b" />}
          />
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </HeaderRight>
      </FlexContainer>
    </AppHeaderWrapper>
  )
}
