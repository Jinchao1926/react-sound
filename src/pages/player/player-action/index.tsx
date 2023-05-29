import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { switchPlayModeAction } from '../store'

import { PlayerActionWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const PlayerAction: FC<IProps> = () => {
  // redux
  const { playlist, playMode } = useAppSelector(
    (state) => ({
      playlist: state.player.playlist,
      playMode: state.player.playMode
    }), 
    shallowEqual
  )

  const dispatch = useAppDispatch()
  const handlePlayMode = () => {
    dispatch(switchPlayModeAction())
  }

  return (
    <PlayerActionWrapper>
      <div className='left'>
        <button className='btn pip' />
        <button className='sprite_player_bar btn collect' />
        <button className='sprite_player_bar btn share' />
      </div>
      <div className='right sprite_playbar'>
        <button className='sprite_player_bar btn mute' />
        <button className={`sprite_player_bar btn ${playMode}`} onClick={handlePlayMode}/>
        <button className='sprite_player_bar btn playlist'>{playlist.length}</button>
      </div>
    </PlayerActionWrapper>
  )
}

export default memo(PlayerAction)