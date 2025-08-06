import type { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { UserLink } from '@/components/UserLink'
import { useSimilarSongsQuery } from '@/hooks/song/useSimilarSongsQuery'
// import { usePlayerContext } from '@/providers/PlayerProvider'

import { SimilarSongItem, SimilarSongWrapper } from './SimilarSong.styles'

export const SimilarSong: FC<{ songId: number }> = ({ songId }) => {
  const { data } = useSimilarSongsQuery(songId)
  // const { playSong, addToPlaylist } = usePlayerContext()

  return (
    <SimilarSongWrapper>
      <SectionHeader variant="simple" title="相似歌曲" />
      <div className="songs">
        {data.map((song) => (
          <SimilarSongItem key={song.id}>
            <div className="info">
              <NavLink className="song no-wrap" to={`/song?id=${song.id}`}>
                {song.name}
              </NavLink>
              <UserLink users={song.artists} />
            </div>
            <div className="control">
              <button
                className="btn sprite_icon3 play"
                // onClick={() => playSong(song)}
              />
              <button
                className="btn sprite_icon3 addto"
                // onClick={() => addToPlaylist(song)}
              />
            </div>
          </SimilarSongItem>
        ))}
      </div>
    </SimilarSongWrapper>
  )
}
