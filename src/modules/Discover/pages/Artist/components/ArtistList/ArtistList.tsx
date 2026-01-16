import { Fragment, type FC } from 'react'

import { Box, Flex } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { UserLink } from '@/components/Links'
import { SectionHeader } from '@/components/SectionHeader'
import {
  ArtistTypeEnum,
  useArtistListQuery,
} from '@/hooks/artist/useArtistListQuery'
import { routeBuilder } from '@/routers'
import { formatSizedImage } from '@/utils/format/dataFormat'

import { DashedDivider, UserIcon } from './ArtistList.styles'
import { useSelectedCategory } from '../../hooks/useSelectedCategory'
import { LetterIndex } from '../LetterIndex'

export const ArtistList: FC = () => {
  const { selectedCategory, selectedInitial } = useSelectedCategory()
  const { data: artists } = useArtistListQuery({
    type: selectedCategory.type,
    area: selectedCategory.area,
    initial: selectedInitial,
    limit: 100,
  })

  const isAllCategory = selectedCategory.type === ArtistTypeEnum.ALL

  return (
    <Box>
      <SectionHeader
        title={isAllCategory ? '热门分类' : selectedCategory.label}
      />
      {!isAllCategory && <LetterIndex />}

      <Flex justify="space-between" flexWrap="wrap" mt={20}>
        {artists.map((artist, idx) => {
          if (idx < 10) {
            return (
              <Fragment key={artist.id}>
                <Box mb={30}>
                  <CoverImage
                    src={formatSizedImage(artist.img1v1Url, 130)}
                    alt={artist.name}
                    to={routeBuilder.artist(artist.id)}
                    size={130}
                    coverSprite="cover"
                    coverIcon="bright130"
                  />
                  <Flex justify="space-between" align="center" mt={8}>
                    <UserLink users={[artist]} color="#000" />
                    <UserIcon />
                  </Flex>
                </Box>
                {idx === 9 && <DashedDivider key="divider" />}
              </Fragment>
            )
          }

          return (
            <Flex
              key={artist.id}
              gap={2}
              align="center"
              width={130}
              lineHeight={30}
            >
              <UserLink users={[artist]} color="#000" />
              <UserIcon />
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
