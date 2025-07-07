import { FC, useEffect } from 'react'

import { useAppDispatch } from '@/store'

import { AlbumWrapper } from './Album.styles'
import { AllAlbum } from './components/AllAlbum'
import { NewAlbum } from './components/NewAlbum'
import { fetchAllAlbumsAsync, fetchHotAlbumsAsync } from './store'

export const Album: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHotAlbumsAsync())
    dispatch(fetchAllAlbumsAsync(0))
  }, [dispatch])

  return (
    <AlbumWrapper className="wrap-v2">
      <NewAlbum />
      <AllAlbum />
    </AlbumWrapper>
  )
}
