import type { FC } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { NavLink, useLocation } from 'react-router-dom'

import { rootNavigations } from '@/constants/navigation'

import {
  AppHeaderWrapper,
  AppNavigationItem,
  CreatorCenter,
  HeaderLogo,
  RedTriangle,
  Search,
} from './AppHeader.styles'
import { Divider, Flex, FlexContainer, Link } from '../Core'

export const AppHeader: FC = () => {
  const location = useLocation()

  const isDiscoverActiveForPath = (pathname: string) => {
    // Default behavior
    if (pathname.startsWith('/discover')) {
      return true
    }

    // Detail routes that should also activate the "发现音乐" navigation item
    const detailRoutes = ['/playlist', '/song', '/album', '/mv', '/program']
    return detailRoutes.some((route) => pathname.startsWith(route))
  }

  return (
    <AppHeaderWrapper>
      <FlexContainer variant="large">
        <Flex justify="space-between">
          <HeaderLogo href="#/">网易云音乐</HeaderLogo>

          <Flex justify="space-between" lineHeight={70}>
            {rootNavigations.map((item) => (
              <AppNavigationItem key={item.title}>
                {item.type === 'path' ? (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => {
                      if (item.key === 'discover') {
                        return isDiscoverActiveForPath(location.pathname)
                          ? 'active'
                          : ''
                      }
                      return isActive ? 'active' : ''
                    }}
                  >
                    {item.title}
                    <RedTriangle />
                  </NavLink>
                ) : (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                )}
              </AppNavigationItem>
            ))}
          </Flex>
        </Flex>

        <Flex align="center" ml={5} gap={12} textAlign="center" fontSize={12}>
          <Search
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined twoToneColor="#9b9b9b" />}
          />
          <CreatorCenter
            href="https://music.163.com/#/creatorcenter"
            target="_blank"
            rel="noreferrer"
          >
            创作者中心
          </CreatorCenter>
          <Link hoverUnderline color="#787878" padding="0 10px">
            登录
          </Link>
        </Flex>
      </FlexContainer>

      <Divider size={5} margin={0} color="#c20c0c" />
    </AppHeaderWrapper>
  )
}
