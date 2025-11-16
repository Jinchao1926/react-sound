import React, { FC } from 'react'

import { UserLinks } from './UserLink.styles'
import { TextNavLink } from '../UI'

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
    <UserLinks nowrap>
      {users.map((item, idx) => (
        <React.Fragment key={item.id}>
          {idx > 0 && (space ? ' / ' : '/')}
          <TextNavLink to={`/artist?id=${item.id}`} color={color} fontSize={12}>
            {item.name}
          </TextNavLink>
        </React.Fragment>
      ))}
    </UserLinks>
  )
}
