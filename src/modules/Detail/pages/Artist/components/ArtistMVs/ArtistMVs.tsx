import React, { FC, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, Flex, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { JCPagination } from '@/components/Pagination'
import { useArtistMVsQuery } from '@/hooks/artist/useArtistMVsQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'
import { routeBuilder } from '@/routers'
import { formatImage } from '@/utils/dataFormat'

import { MVItem, PlayButton } from './ArtistMVs.styles'

const PAGE_SIZE = 12

export const ArtistMVs: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const totalCountRef = useRef<number | null>(null)

  const navigate = useNavigate()
  const { id: artistId } = useQueryParamId()
  const { data: mvs, hasMore } = useArtistMVsQuery({
    id: artistId,
    offset: (currentPage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  })

  if (!mvs) return null

  // 当到达最后一页时，固定 totalCount
  if (hasMore === false && totalCountRef.current === null) {
    totalCountRef.current = (currentPage - 1) * PAGE_SIZE + mvs.length
  }

  const count =
    totalCountRef.current ??
    (hasMore
      ? currentPage * PAGE_SIZE + 1
      : (currentPage - 1) * PAGE_SIZE + mvs.length)

  return (
    <Box>
      <Flex flexWrap="wrap" mr={-29} mb={20}>
        {mvs.map((mv) => (
          <MVItem key={mv.id}>
            <CoverImage
              src={formatImage(mv.imgurl, 137, 103)}
              alt={mv.name}
              to={routeBuilder.mv(mv.id)}
              size={{ width: 137, height: 103 }}
              coverSprite="cover"
              coverIcon="MV"
            >
              <PlayButton onClick={() => navigate(routeBuilder.mv(mv.id))} />
            </CoverImage>

            <TextNavLink
              to={routeBuilder.mv(mv.id)}
              color="#000"
              fontSize={14}
              width={137}
              nowrap
              mt={8}
              mb={3}
            >
              {mv.name}
            </TextNavLink>
          </MVItem>
        ))}
      </Flex>

      <JCPagination
        total={count}
        pageSize={PAGE_SIZE}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
    </Box>
  )
}
