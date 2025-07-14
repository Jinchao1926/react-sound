import type { FC, ReactNode } from 'react'
import { memo } from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { SectionHeader } from '@/components/SectionHeader'
import { UserLink } from '@/components/UserLink'
import { addSongToPlaylistAction, playSongAction } from '@/modules/Player/store'
import { useAppDispatch, useAppSelector } from '@/store'

import { SimilarSongItem, SimilarSongWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const SimilarSong: FC<IProps> = () => {
  // redux
  const { similarSongs } = useAppSelector(
    (state) => ({
      similarSongs: state.song.similarSongs,
    }),
    shallowEqual
  )

  // handles
  const dispatch = useAppDispatch()
  const playMusic = (id: string) => {
    dispatch(playSongAction(id))
  }
  const addMusicToPlaylist = (id: string) => {
    dispatch(addSongToPlaylistAction(id))
  }

  return (
    <SimilarSongWrapper>
      <SectionHeader variant="simple" title="相似歌曲" />
      <div className="songs">
        {similarSongs.map((item: { id: string; name: string; artists: [] }) => (
          <SimilarSongItem key={item.id}>
            <div className="info">
              <NavLink className="song no-wrap" to={`/song?id=${item.id}`}>
                {item.name}
              </NavLink>
              <UserLink users={item.artists} />
            </div>
            <div className="control">
              <button
                className="btn sprite_icon3 play"
                onClick={() => playMusic(item.id)}
              />
              <button
                className="btn sprite_icon3 addto"
                onClick={() => addMusicToPlaylist(item.id)}
              />
            </div>
          </SimilarSongItem>
        ))}
      </div>
    </SimilarSongWrapper>
  )
}

export default memo(SimilarSong)
