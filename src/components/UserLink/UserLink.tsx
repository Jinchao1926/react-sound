import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { UserLinkWrapper } from './UserLink.styles'

interface UserLinkProps {
  users: { id: number; name: string }[]
  space?: boolean
  color?: string
}

export const UserLink: FC<UserLinkProps> = ({
  users,
  space = false,
  color,
}) => {
  return (
    <UserLinkWrapper color={color}>
      <span className="user-links no-wrap">
        {users.map((item, idx) => (
          <React.Fragment key={item.id}>
            {idx > 0 && (space ? ' / ' : '/')}
            <NavLink to={`/artist?id=${item.id}`}>{item.name}</NavLink>
          </React.Fragment>
        ))}
      </span>
    </UserLinkWrapper>
  )
}
