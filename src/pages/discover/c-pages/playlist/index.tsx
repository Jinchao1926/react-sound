import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Playlist: FC<IProps> = () => {
  return (
    <div>Playlist</div>
  )
}

export default memo(Playlist)