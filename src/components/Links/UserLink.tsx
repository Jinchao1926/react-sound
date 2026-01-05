import { Fragment, type FC } from 'react'

import { routeBuilder } from '@/routers'

import { UserLinks } from './UserLink.styles'
import { TextNavLink } from '../Core'

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
  block = false,
  space = false,
  color,
}) => {
  return (
    <UserLinks nowrap block={block}>
      {users.map((item, idx) => (
        <Fragment key={item.id}>
          {idx > 0 && (space ? ' / ' : '/')}
          <TextNavLink
            to={routeBuilder.artist(item.id)}
            color={color}
            fontSize={12}
          >
            {item.name}
          </TextNavLink>
        </Fragment>
      ))}
    </UserLinks>
  )
}
