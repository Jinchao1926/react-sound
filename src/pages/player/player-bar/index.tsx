import React, { memo, useState, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import { formatSizedImage } from '@/utils/format-utils'
import { formatTime, getMusicUrl } from '@/utils/format-player'

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

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // ms
  const [duration, setDuration] = useState(0) // ms
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // redux
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }), 
    shallowEqual
  )

  // Format data
  useEffect(() => {
    if (currentSong) {
      setSongUrl(`/song?id=${currentSong.id}`)
      setSongAvatar(formatSizedImage(currentSong.al.picUrl, 35))
      setDuration(currentSong.dt)
  
      if (audioRef.current) {
        audioRef.current.src = getMusicUrl(currentSong.id)
        audioRef.current.play()
          .then(() => {
            console.log("Play music successfully")
          }).catch(err => {
            console.log("Play music failed:", err)
          })
      }
      return
    }
    
    // clear 
    setSongUrl('')
    setSongAvatar(require('@/assets/img/default_album.png'))
    setDuration(0)

    if (audioRef.current) {
      audioRef.current.src = ""
      audioRef.current.pause()
    }
  }, [currentSong])

  // Player
  function handlePlayMusic() {
    const willBePlaying = !isPlaying
    console.log("handlePlayMusic willBePlaying: ", willBePlaying)
    if (willBePlaying) {
      audioRef.current?.play()
        .then(() => {
          console.log("Play music successfully")
        }).catch(err => {
          console.log("Play music failed:", err)
        })
      console.log("Play")
    } else {
      audioRef.current?.pause()
      console.log("Pause")
    }
    // willBePlaying ? audioRef.current?.play() : audioRef.current?.pause()
    setIsPlaying(willBePlaying)
  }
  function handlePlayerTimeUpdate(e: React.SyntheticEvent) {
    const target = e.target as HTMLAudioElement
    const newTime = Math.min(target.currentTime * 1000, duration)// ms
    setCurrentTime(newTime)
    // console.log("handlePlayerTimeUpdate target.currentTime:", target.currentTime)
    // console.log("progress:", newTime / duration * 100)
    setProgress(newTime / duration * 100)
  }

  // Progress
  function handleProgressChange(percent: number) {
    console.log("handleProgressChange percent:", percent)
    // 进度条变化中...
    const newTime = percent * duration / 100
    setCurrentTime(newTime)
    setProgress(percent)
  }
  function handleProgressAfterChange(percent: number) {
    // 进度条变化结束后播放音乐
    const newTimeInSec = (percent / 100) * duration / 1000
    setCurrentTime(newTimeInSec)
    audioRef.current && (audioRef.current.currentTime = newTimeInSec)
  }

  return (
    <PlayerBarWrapper className='sprite_player_bar'>
      <div className='content wrap-v2'>
        <PlayerControl isPlaying={isPlaying}>
          <button className='sprite_player_bar prev' />
          <button className='sprite_player_bar play' onClick={e => handlePlayMusic()}/>
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
      <audio ref={audioRef} onTimeUpdate={e => handlePlayerTimeUpdate(e)}/>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)