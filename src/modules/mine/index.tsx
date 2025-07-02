import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import MineLogin from './MineLogin'
import { MineWrapper } from './style'

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
