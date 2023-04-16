import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const DJRadio: FC<IProps> = () => {
  return (
    <div>DJRadio</div>
  )
}

export default memo(DJRadio)