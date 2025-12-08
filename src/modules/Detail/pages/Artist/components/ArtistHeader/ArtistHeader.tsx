import React, { FC } from 'react'

import { Box, Flex, Image } from '@/components/Core'
import { useArtistQuery } from '@/hooks/artist/useArtistsQuery'
import { routeBuilder } from '@/routers'
import { formatImage } from '@/utils/dataFormat'

import {
  Actions,
  ArtistAlias,
  ArtistCover,
  ArtistName,
  Favorite,
  HomepageLink,
} from './ArtistHeader.styles'

export const ArtistHeader: FC<{ artistId: number }> = ({ artistId }) => {
  const { data: artist } = useArtistQuery(artistId)

  if (!artist) return null

  return (
    <Box mt={-10}>
      <Flex alignItems="end" gap={10}>
        <ArtistName>{artist.name}</ArtistName>
        <ArtistAlias>{artist.alias?.join(';')}</ArtistAlias>
      </Flex>

      <Box position="relative">
        <Image
          src={formatImage(artist.picUrl, 640, 300)}
          alt={artist.name}
          width={640}
          height={300}
        />
        <ArtistCover />
        <Actions>
          <HomepageLink to={routeBuilder.user(artist.accountId)} />
          <Favorite />
        </Actions>
      </Box>
    </Box>
  )
}
