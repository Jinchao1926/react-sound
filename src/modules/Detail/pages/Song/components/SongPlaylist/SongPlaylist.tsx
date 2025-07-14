import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { useSongPlaylistsQuery } from '@/hooks/song/useSongPlaylistsQuery'
import { formatSizedImage } from '@/utils/format-utils'

import { SongPlaylistItem, SongPlaylistWrapper } from './SongPlaylist.styles'

export const SongPlaylist: FC<{ songId: number }> = ({ songId }) => {
  const { data } = useSongPlaylistsQuery(songId)

  return (
    <SongPlaylistWrapper>
      <SectionHeader variant="simple" title="包含这首歌的歌单" />
      <div className="playlists">
        {data.map((playlist) => (
          <SongPlaylistItem key={playlist.id}>
            <NavLink className="cover" to={`/playlist?id=${playlist.id}`}>
              <img
                src={formatSizedImage(playlist.coverImgUrl, 50)}
                alt={playlist.name}
              />
            </NavLink>
            <div className="info">
              <NavLink
                className="playlist no-wrap"
                to={`/playlist?id=${playlist.id}`}
              >
                {playlist.name}
              </NavLink>
              <p className="author no-wrap">
                by
                <NavLink
                  className="author-name"
                  to={`/user/home?id=${playlist.creator.userId}`}
                >
                  {playlist.creator.nickname}
                </NavLink>
              </p>
            </div>
          </SongPlaylistItem>
        ))}
      </div>
    </SongPlaylistWrapper>
  )
}
