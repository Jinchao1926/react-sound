import { type FC } from 'react'

import { NavLink } from 'react-router-dom'

import { routeBuilder } from '@/routers'

import { MVIcon } from '../Shared/Badge'

interface MVLinkProps {
  mvID?: number
}

export const MVLink: FC<MVLinkProps> = ({ mvID }) => {
  if (!mvID || mvID === 0) return null

  return (
    <NavLink to={routeBuilder.mv(mvID)}>
      <MVIcon mt={2} ml={2} />
    </NavLink>
  )
}
