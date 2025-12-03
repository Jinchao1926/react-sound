import React, { FC } from 'react'

import { ArtistLeft, ArtistRight, ArtistWrapper } from './Artist.styles'
import { ArtistCategory } from './components/ArtistCategory'
import { ArtistList } from './components/ArtistList'

export const Artist: FC = () => {
  return (
    <ArtistWrapper>
      <ArtistLeft>
        <ArtistCategory />
      </ArtistLeft>
      <ArtistRight>
        <ArtistList />
      </ArtistRight>
    </ArtistWrapper>
  )
}
