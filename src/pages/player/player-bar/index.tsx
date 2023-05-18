import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchSongDetailAsync } from '@/pages/player/store'

import { formatSizedImage } from '@/utils/format-utils'
import { formatTime } from '@/utils/format-player'

import { 
  PlayerBarWrapper,
  PlayerControl,
  PlayerInfo,
  PlayerProgressBar,
  PlayerAction
} from './style'
import ProgressBar from '../progress-bar'

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  // data
  const [songUrl, setSongUrl] = useState("")
  const [songAvatar, setSongAvatar] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)

  // redux
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }), 
    shallowEqual
  )

  // request
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSongDetailAsync("2046805446"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Format data
  useEffect(() => {
    if (!currentSong) {
      setSongUrl('')
      setSongAvatar(require('@/assets/img/default_album.png'))
      setDuration(0)
      return
    }
    setSongUrl(`/song?id=${currentSong?.id}`)
    setSongAvatar(formatSizedImage(currentSong?.al.picUrl, 35))
    setDuration(currentSong?.dt || 0)

  }, [currentSong])

  // handles
  function handleProgressChange(percent: number) {
    console.log("handleProgressChange:", percent)
    const newTime = percent * duration / 100
    setCurrentTime(newTime)
    setProgress(percent)
  }
  function handleProgressAfterChange(percent: number) {
    console.log("handleProgressAfterChange:", percent)
  }

  return (
    <PlayerBarWrapper className='sprite_player_bar'>
      <div className='content wrap-v2'>
        <PlayerControl>
          <button className='sprite_player_bar prev' />
          <button className='sprite_player_bar play' />
          <button className='sprite_player_bar next' />
        </PlayerControl>
        <PlayerInfo>
          <div className='avatar'>
            <img src={songAvatar} alt='' />
            <a className='sprite_player_bar' href={songUrl}> </a>
          </div>
          <div className='info'>
            <div className='music'>
              <a className='name' href={songUrl}>{currentSong?.name}</a>
              <span className='singer'>
                { currentSong?.ar.map((item: {name: string}) => item.name).join("/" ) }
              </span>
            </div>
            <PlayerProgressBar>
              <ProgressBar 
                percent={progress} 
                onChange={value => handleProgressChange(value)}
                onAfterChange={value => handleProgressAfterChange(value)}
              />
              <span className='time'>
                <span className='now-time'>{ formatTime(currentTime) }</span>
                <span className='duration'>{` / ${formatTime(duration)}`}</span>
              </span>
            </PlayerProgressBar>
          </div>
        </PlayerInfo>
        <PlayerAction>
          <div className='left'>
            <button className='btn pip' />
            <button className='sprite_player_bar btn collect' />
            <button className='sprite_player_bar btn share' />
          </div>
          <div className='right sprite_playbar'>
            <button className='sprite_player_bar btn mute' />
            <button className='sprite_player_bar btn loop' />
            <button className='sprite_player_bar btn playlist'>2</button>
          </div>
        </PlayerAction>
      </div>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)