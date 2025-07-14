import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { discoverNavigations } from '@/constants/navigation'

import { DiscoverMenuWrapper } from './DiscoverMenu.styles'

export const DiscoverMenu: FC = () => {
  return (
    <DiscoverMenuWrapper>
      <div className="nav-list wrap-v1">
        {discoverNavigations.map((item) => (
          <div className="nav-item" key={item.title}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </div>
        ))}
      </div>
    </DiscoverMenuWrapper>
  )
}
