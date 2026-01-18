import { type FC } from 'react'

import { NavLink } from 'react-router-dom'

import { routeBuilder } from '@/routers'

import { PlayMV, PlayMVRed } from '../Shared/Badge'

interface MVLinkProps {
  mvID?: number
  variant?: 'list' | 'detail'
}

export const MVLink: FC<MVLinkProps> = ({ mvID, variant = 'list' }) => {
  if (!mvID || mvID === 0) return null

  const MVIcon = variant === 'detail' ? PlayMVRed : PlayMV

  return (
    <NavLink to={routeBuilder.mv(mvID)}>
      <MVIcon mt={2} ml={2} />
    </NavLink>
  )
}
