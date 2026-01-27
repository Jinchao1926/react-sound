import { type FC } from 'react'

import { routeBuilder } from '@/routers'

import { StyledMVLink } from './MVLink.styles'
import { PlayMV, PlayMVRed } from '../Shared/Badge'
import { PlaybarMV } from '../Shared/Playbar'

interface MVLinkProps {
  mvID?: number
  variant?: 'playbar' | 'list' | 'detail'
}

export const MVLink: FC<MVLinkProps> = ({ mvID, variant = 'list' }) => {
  if (!mvID || mvID === 0) return null

  const MVIcon =
    variant === 'playbar'
      ? PlaybarMV
      : variant === 'detail'
        ? PlayMVRed
        : PlayMV

  return (
    <StyledMVLink to={routeBuilder.mv(mvID)}>
      <MVIcon />
    </StyledMVLink>
  )
}
