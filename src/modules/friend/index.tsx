import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import FriendLogin from './friend-login'
import { FriendWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Friend: FC<IProps> = () => {
  return (
    <FriendWrapper>
      <FriendLogin />
    </FriendWrapper>
  )
}

export default memo(Friend)
