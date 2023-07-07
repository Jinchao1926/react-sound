import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { UserLinkWrapper } from './style'
import { NavLink } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  users: {id: string, name: string}[];
  showSpace?: boolean
}

const UserLink: FC<IProps> = (props: IProps) => {
  const { users, showSpace = false } = props
  return (
    <UserLinkWrapper>
      <span className='user-links no-wrap'>
      {
        users.map((item: {id: string, name: string}, idx: number) => {
          return (
            <React.Fragment key={item.id}>
              { idx > 0 && (showSpace ? ' / ' : '/')}
              <NavLink  to={`/artist?id=${item.id}`}>{item.name}</NavLink>
            </React.Fragment>
          )
        })
      }
      </span>
    </UserLinkWrapper>
  )
}

export default memo(UserLink)