import React, { FC } from 'react'

import { UserLinks } from './UserLink.styles'
import { TextNavLink } from '../UI'

interface UserLinkProps {
  users: { id: number; name: string }[]
  // Whether to display as block element
  block?: boolean
  // Whether to add space around the slash
  space?: boolean
  // Text color
  color?: string
}

export const UserLink: FC<UserLinkProps> = ({
  users,
  block = true,
  space = false,
  color,
}) => {
  return (
    <UserLinks nowrap block={block}>
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
