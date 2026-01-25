import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { AlbumWrapper } from './Album.styles'
import { AllAlbum } from './components/AllAlbum/AllAlbum'
import { NewAlbum } from './components/NewAlbum'

export const Album: FC = () => {
  return (
    <>
      <Helmet>
        <title>新碟上架 - React Sound</title>
        <meta name="description" content="新碟上架" />
      </Helmet>
      <AlbumWrapper>
        <NewAlbum />
        <AllAlbum />
      </AlbumWrapper>
    </>
  )
}
