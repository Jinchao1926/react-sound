import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { UserLinkWrapper } from './UserLink.styles'

interface UserLinkProps {
  users: { id: number; name: string }[]
  showSpace?: boolean
}

export const UserLink: FC<UserLinkProps> = ({ users, showSpace = false }) => {
  return (
    <UserLinkWrapper>
      <span className="user-links no-wrap">
        {users.map((item, idx) => {
          return (
            <React.Fragment key={item.id}>
              {idx > 0 && (showSpace ? ' / ' : '/')}
              <NavLink to={`/artist?id=${item.id}`}>{item.name}</NavLink>
            </React.Fragment>
          )
        })}
      </span>
    </UserLinkWrapper>
  )
}
