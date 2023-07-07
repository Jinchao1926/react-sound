import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { shallowEqual } from 'react-redux'

import { useAppDispatch, useAppSelector } from '@/store'
import { playSongAction, addSongToPlaylistAction } from '@/pages/player/store'

import { 
  SimilarSongWrapper,
  SimilarSongItem
} from './style'
import SectionHeaderMore from '@/components/section-header-more'
import UserLink from '@/components/user-link'

interface IProps {
  children?: ReactNode
}

const SimilarSong: FC<IProps> = () => {
  // redux
  const { similarSongs } = useAppSelector((state) => ({
      similarSongs: state.song.similarSongs
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
      <SectionHeaderMore title='相似歌曲'/>
      <div className='songs'>
        {
          similarSongs.map((item: {id: string, name: string, artists: []}) => {
            return (
              <SimilarSongItem key={item.id}>
                <div className='info'>
                  <NavLink className='song no-wrap' to={`/discover/song?id=${item.id}`}>
                    {item.name}
                  </NavLink>
                  <UserLink users={item.artists} />
                </div>
                <div className='control'>
                  <button className='btn sprite_icon3 play' onClick={e => playMusic(item.id)}/>
                  <button className='btn sprite_icon3 addto' onClick={e => addMusicToPlaylist(item.id)}/>
                </div>
              </SimilarSongItem>
            )
          })
        }
      </div>
    </SimilarSongWrapper>
  )
}

export default memo(SimilarSong)