import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { FriendWrapper } from './style'
import FriendLogin from './c-pages/friend-login'

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