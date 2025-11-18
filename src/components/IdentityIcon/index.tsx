import React, { type FC } from 'react'

import { Image } from '../Core'

interface IdentityIconProps {
  avatarDetail?: {
    identityLevel: number
    identityIconUrl: string
  }
}

export const IdentityIcon: FC<IdentityIconProps> = ({ avatarDetail }) => {
  if (!avatarDetail) return null

  return (
    <Image
      src={avatarDetail.identityIconUrl}
      alt={`${avatarDetail.identityLevel}`}
      width={13}
      height={13}
    />
  )
}
