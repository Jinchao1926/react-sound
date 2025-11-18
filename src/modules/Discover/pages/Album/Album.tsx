import { FC } from 'react'

import { AlbumWrapper } from './Album.styles'
import { AllAlbum } from './components/AllAlbum/AllAlbum'
import { NewAlbum } from './components/NewAlbum'

export const Album: FC = () => {
  return (
    <AlbumWrapper>
      <NewAlbum />
      <AllAlbum />
    </AlbumWrapper>
  )
}
