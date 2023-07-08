import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { fetchHotAlbumsAsync, fetchAllAlbumsAsync } from './store'

import { AlbumWrapper } from './style'
import HotAlbum from './c-components/hot-album'
import AllAlbum from './c-components/all-album'

interface IProps {
  children?: ReactNode
}

const Album: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHotAlbumsAsync())
    dispatch(fetchAllAlbumsAsync(0))
  }, [dispatch])

  return (
    <AlbumWrapper className='wrap-v2'>
      <HotAlbum />
      <AllAlbum />
    </AlbumWrapper>
  )
}

export default memo(Album)