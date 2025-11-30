import type { FC } from 'react'

import { Box, TextNavLink } from '@/components/Core'
import { CoverImage } from '@/components/CoverImage'
import { SectionHeader } from '@/components/SectionHeader'
import { routeBuilder } from '@/routers'
import { PlaylistDetail } from '@/types/playlist'
import { formatSizedImage } from '@/utils/dataFormat'

import { RelatedPlaylistItem } from './RelatedPlaylists.styles'

export interface RelatedPlaylistsProps {
  playlists: PlaylistDetail[]
  title?: string
}

export const RelatedPlaylists: FC<RelatedPlaylistsProps> = ({
  playlists,
  title = '包含这首歌的歌单',
}) => {
  if (playlists.length === 0) return null

  return (
    <Box mb={40}>
      <SectionHeader variant="simple" title={title} />
      <Box mt={20}>
        {playlists.map((playlist) => (
          <RelatedPlaylistItem key={playlist.id}>
            <CoverImage
              src={formatSizedImage(playlist.coverImgUrl, 50)}
              to={routeBuilder.playlist(playlist.id)}
              alt={playlist.name}
              size={50}
            />

            <Box width={140}>
              <TextNavLink
                to={routeBuilder.playlist(playlist.id)}
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
                  to={routeBuilder.user(playlist.creator.userId)}
                  color="#666"
                  ml={5}
                >
                  {playlist.creator.nickname}
                </TextNavLink>
              </Box>
            </Box>
          </RelatedPlaylistItem>
        ))}
      </Box>
    </Box>
  )
}
