import { type FC, useRef, useState } from 'react'

import { Box, Paragraph, Text } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { Pagination } from '@/components/Pagination'
import { useArtistAlbumsQuery } from '@/hooks/artist/useArtistAlbumsQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/dataFormat'
import { formatYearMonthDay } from '@/utils/timeFormat'

import {
  AlbumItem,
  AlbumList,
  AlbumName,
  AlbumnLink,
  CoverPlayButton,
} from './ArtistAlbums.styles'

const PAGE_SIZE = 12

export const ArtistAlbums: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalCountRef = useRef<number | null>(null)

  const { id: artistId } = useQueryParamId()
  const { data: albums, more } = useArtistAlbumsQuery({
    id: artistId,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  if (!albums) return null

  // 当到达最后一页时，固定 totalCount
  if (more === false && totalCountRef.current === null) {
    totalCountRef.current = (currentPage - 1) * PAGE_SIZE + albums.length
  }

  const count =
    totalCountRef.current ??
    (more
      ? currentPage * PAGE_SIZE + 1
      : (currentPage - 1) * PAGE_SIZE + albums.length)

  return (
    <Box>
      <AlbumList>
        {albums.map((album) => (
          <AlbumItem key={album.id}>
            <CoverImage
              src={formatSizedImage(album.picUrl, 120)}
              to={routeBuilder.album(album.id)}
              alt={album.name}
              size={120}
              coverSprite="cover"
              coverIcon="albumLarge"
              coverWidth={145}
            >
              <CoverPlayButton />
            </CoverImage>

            <AlbumName>
              <AlbumnLink to={routeBuilder.album(album.id)} color="#000">
                {album.name}
              </AlbumnLink>

              {album.transNames && album.transNames.length > 0 && (
                <Text
                  fontSize={14}
                  color="#aeaeae"
                >{` - (${album.transNames[0]})`}</Text>
              )}
            </AlbumName>
            <Paragraph color="#666" m={0}>
              {formatYearMonthDay(album.publishTime, 'dot')}
            </Paragraph>
          </AlbumItem>
        ))}
      </AlbumList>

      <Pagination
        total={count}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
    </Box>
  )
}
