import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { ResidentSingerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const ResidentSinger: FC<IProps> = () => {
  return (
    <ResidentSingerWrapper>
      ResidentSingerWrapper
    </ResidentSingerWrapper>
  )
}

export default memo(ResidentSinger)