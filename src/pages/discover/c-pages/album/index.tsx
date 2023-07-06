import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { AlbumWrapper } from './style'
import HotAlbum from './c-components/hot-album'
import AllAlbum from './c-components/all-album'

interface IProps {
  children?: ReactNode
}

const Album: FC<IProps> = () => {
  return (
    <AlbumWrapper className='wrap-v2'>
      <HotAlbum />
      <AllAlbum />
    </AlbumWrapper>
  )
}

export default memo(Album)