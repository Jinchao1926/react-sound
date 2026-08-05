import { type FC } from 'react'

import { Box, Flex } from '@/components/Core'
import { CollectGreyButton } from '@/components/Shared/Social'
import { TrackCollection } from '@/components/TrackCollection'
import { useArtistTopSongsQuery } from '@/hooks/artist/useArtistTopSongsQuery'
import { useQueryParamId } from '@/hooks/useQueryParamId'
import { usePlayerContext } from '@/providers/PlayerProvider'

import { AddBlueButton, PlayBlueButton } from './ArtistSongs.styles'

export const ArtistSongs: FC = () => {
  const { id: artistId } = useQueryParamId()
  const { data: songs } = useArtistTopSongsQuery(artistId)

  const { playTrack, playTracks, addToPlaylist, addTracksToPlaylist } =
    usePlayerContext()

  if (!songs) return null

  return (
    <Box>
      <Flex gap={10} mb={10}>
        <Flex>
          <PlayBlueButton onClick={() => playTracks(songs)}>
            播放
          </PlayBlueButton>
          <AddBlueButton onClick={() => addTracksToPlaylist(songs)} />
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
        callbacks={{
          onPlayClick: (track) => playTrack(track),
          onAddClick: (track) => addToPlaylist(track),
        }}
      />
    </Box>
  )
}
