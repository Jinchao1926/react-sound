import type { FC } from 'react'

import { Box, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { useSongPlaylistsQuery } from '@/hooks/song/useSongPlaylistsQuery'
import { formatSizedImage } from '@/utils/dataFormat'

import { SongPlaylistItem } from './SongPlaylist.styles'

export const SongPlaylist: FC<{ songId: number }> = ({ songId }) => {
  const { data } = useSongPlaylistsQuery(songId)

  return (
    <Box mb={40}>
      <SectionHeader variant="simple" title="包含这首歌的歌单" />
      <Box mt={20}>
        {data.map((playlist) => (
          <SongPlaylistItem key={playlist.id}>
            <CoverImage
              src={formatSizedImage(playlist.coverImgUrl, 50)}
              to={`/playlist?id=${playlist.id}`}
              alt={playlist.name}
              size={50}
            />

            <Box width={140}>
              <TextNavLink
                to={`/playlist?id=${playlist.id}`}
                fontSize={14}
                lineHeight={24}
                color="#000"
                nowrap
              >
                {playlist.name}
              </TextNavLink>

              <Box lineHeight={24} color="#999" nowrap>
                by
                <TextNavLink
                  to={`/user/home?id=${playlist.creator.userId}`}
                  color="#666"
                  ml={5}
                >
                  {playlist.creator.nickname}
                </TextNavLink>
              </Box>
            </Box>
          </SongPlaylistItem>
        ))}
      </Box>
    </Box>
  )
}
