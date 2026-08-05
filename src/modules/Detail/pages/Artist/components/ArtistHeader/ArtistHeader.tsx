import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { Box, Flex, Image } from '@/components/Core'
import { artistNavigations } from '@/constants/navigation'
import { useArtistDetailQuery } from '@/hooks/artist/useArtistDetailQuery'
import { routeBuilder } from '@/routers'
import { formatImage } from '@/utils/format/dataFormat'

import {
  Actions,
  ArtistAlias,
  ArtistCover,
  ArtistName,
  ArtistNavigationBar,
  ArtistNavigationLink,
  Favorite,
  HomepageLink,
} from './ArtistHeader.styles'

export const ArtistHeader: FC<{ artistId: number }> = ({ artistId }) => {
  const { data } = useArtistDetailQuery(artistId)

  if (!data) return null
  const { artist, user } = data.data

  return (
    <>
      <Helmet>
        <title>
          {artist.name}
          {artist.alias && `(${artist.alias.join(';')})`} - 歌手 - React Sound
        </title>
        <meta name="description" content={artist.name} />
      </Helmet>
      <Box mt={-10} mb={20}>
        <Flex alignItems="end" gap={10}>
          <ArtistName>{artist.name}</ArtistName>
          <ArtistAlias>{artist.alias?.join(';')}</ArtistAlias>
        </Flex>

        <Box position="relative" width={640} height={300}>
          <Image
            src={formatImage(artist.picUrl, 640, 300)}
            alt={artist.name}
            width={640}
            height={300}
          />
          <ArtistCover />
          <Actions>
            {user && <HomepageLink to={routeBuilder.user(user.userId)} />}
            <Favorite />
          </Actions>
        </Box>

        <ArtistNavigationBar>
          {artistNavigations.map((item) => (
            <ArtistNavigationLink
              key={item.title}
              to={`${item.link}?id=${artistId}`}
              end={item.link === '/artist'}
            >
              {item.title}
            </ArtistNavigationLink>
          ))}
        </ArtistNavigationBar>
      </Box>
    </>
  )
}
