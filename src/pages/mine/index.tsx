import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { MineWrapper } from './style'
import MineLogin from './c-pages/mine-login'

interface IProps {
  children?: ReactNode
}

const Mine: FC<IProps> = () => {
  return (
    <MineWrapper>
      <MineLogin />
    </MineWrapper>
  )
}

export default memo(Mine)