import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { discoverNavigations } from '@/constants/navigation'

import {
  DiscoverMenuWrapper,
  DiscoverNavigationItem,
} from './DiscoverMenu.styles'
import { FlexContainer } from '../Core'

export const DiscoverMenu: FC = () => {
  return (
    <DiscoverMenuWrapper>
      <FlexContainer variant="large" height="100%">
        {discoverNavigations.map((item) => (
          <DiscoverNavigationItem key={item.title}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </DiscoverNavigationItem>
        ))}
      </FlexContainer>
    </DiscoverMenuWrapper>
  )
}
