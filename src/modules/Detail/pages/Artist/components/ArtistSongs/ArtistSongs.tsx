import React, { FC } from 'react'

import { Box, Flex } from '@/components/Core'
import { CollectGreyButton } from '@/components/Shared/Social'
import { TrackCollection } from '@/components/TrackCollection'
import { useArtistSongsQuery } from '@/hooks/artist/useArtistsQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'

import { AddBlueButton, PlayBlueButton } from './ArtistSongs.styles'

export const ArtistSongs: FC = () => {
  const { id: artistId } = useQueryParamId()
  const { data: songs } = useArtistSongsQuery(artistId)

  if (!songs) return null

  return (
    <Box>
      <Flex gap={10} mb={10}>
        <Flex>
          <PlayBlueButton onClick={() => {}}>播放</PlayBlueButton>
          <AddBlueButton onClick={() => {}} />
        </Flex>
        <CollectGreyButton title={`收藏热门 ${songs.length}`} />
      </Flex>

      <TrackCollection
        dataSource={{ tracks: songs }}
        config={{
          showExpandableHeader: true,
          showArtistColumn: false,
          showAlbumColumn: true,
          showIndexTrend: false,
          showTitleCoverImage: false,
          columnWidths: {
            index: 94,
            duration: 89,
            album: 148,
          },
        }}
      />
    </Box>
  )
}
