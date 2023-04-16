import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Banner: FC<IProps> = () => {
  return (
    <div>Banner</div>
  )
}

export default memo(Banner)