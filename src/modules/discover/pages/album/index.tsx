import type { FC, ReactNode } from 'react'
import { memo, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import AllAlbum from './components/all-album'
import HotAlbum from './components/hot-album'
import { fetchAllAlbumsAsync, fetchHotAlbumsAsync } from './store'
import { AlbumWrapper } from './style'

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
    <AlbumWrapper className="wrap-v2">
      <HotAlbum />
      <AllAlbum />
    </AlbumWrapper>
  )
}

export default memo(Album)
