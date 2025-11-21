import type { FC } from 'react'

import { Box, Paragraph, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { useArtistAlbumsQuery } from '@/hooks/artist/useArtistAlbumsQuery'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import { PopularAlbumItem } from './PopularArtistAlbums.styles'

export const PopularArtistAlbums: FC<{ artistId: number }> = ({ artistId }) => {
  const { data: albums } = useArtistAlbumsQuery({ id: artistId, limit: 5 })

  return (
    <Box mb={40}>
      <SectionHeader
        variant="simple"
        title="Ta的其他热门专辑"
        moreHref={`/artist/album?id=${artistId}`}
        moreTitle="全部 >"
      />
      <Box mt={20}>
        {albums.map((album) => (
          <PopularAlbumItem key={album.id}>
            <CoverImage
              src={formatSizedImage(album.picUrl, 50)}
              to={`/playlist?id=${album.id}`}
              alt={album.name}
              size={50}
            />

            <Box width={140}>
              <TextNavLink
                to={`/album?id=${album.id}`}
                fontSize={14}
                lineHeight={24}
                color="#000"
                nowrap
              >
                {album.name}
              </TextNavLink>

              <Paragraph color="#666" lineHeight={24} m={0}>
                {formatYearMonthDay(album.publishTime)}
              </Paragraph>
            </Box>
          </PopularAlbumItem>
        ))}
      </Box>
    </Box>
  )
}
