import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { routeBuilder } from '@/routers'

import { MVBadge } from '../Shared/Badge'

interface MVLinkProps {
  mvID?: number
}

export const MVLink: FC<MVLinkProps> = ({ mvID }) => {
  if (!mvID || mvID === 0) return null

  return (
    <NavLink to={routeBuilder.mv(mvID)}>
      <MVBadge mt={2} ml={2} />
    </NavLink>
  )
}
