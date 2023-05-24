import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'

import { formatSizedImage } from '@/utils/format-utils'
import { formatTime, getMusicUrl } from '@/utils/format-player'

import { 
  PlayerBarWrapper,
  PlayerControl,
  PlayButton,
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

  // 标识进度条是否在拖动，防止在音频播放过程中 & 拖动进度条时，进度条操作的冲突
  const [isDragging, setIsDragging] = useState(false)
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

  // 监听 currentSong 变化
  useEffect(() => {
    if (currentSong) {
      setSongUrl(`/song?id=${currentSong.id}`)
      setSongAvatar(formatSizedImage(currentSong.al.picUrl, 35))
      setDuration(currentSong.dt)
  
      if (audioRef.current) {
        audioRef.current.src = getMusicUrl(currentSong.id)

        // DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
        if (!isPlaying) return
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            console.log("Play music successfully")
          }).catch(err => {
            setIsPlaying(false)
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

  // Player Actions
  function handleChangeMusic(isForward: boolean = true) {
    // 切歌
  }
  const handlePlayMusic = useCallback(() => {
    const isPaused = audioRef.current!.paused
    isPaused ? audioRef.current?.play() : audioRef.current?.pause()
    setIsPlaying(isPaused)
  }, [])
  const handlePlayerTimeUpdate = useCallback((e: React.SyntheticEvent) => {
    // 播放时间更新中... 如果这时候在拖动进度条，就不根据播放时间更新进度条
    if (isDragging) return
  
    const target = e.target as HTMLAudioElement
    const newTime = Math.min(target.currentTime * 1000, duration)// ms
    setCurrentTime(newTime)
    setProgress(newTime / duration * 100)
  }, [isDragging, duration])

  // Progress Actions
  const handleProgressChange = useCallback((percent: number) => {
    console.log("handleProgressChange percent:", percent)
    // 进度条变化中...
    setIsDragging(true)
  
    const newTime = percent * duration / 100
    setCurrentTime(newTime)
    setProgress(percent)
  }, [duration])
  const handleProgressAfterChange = useCallback((percent: number) => {
    // 进度条变化结束后播放音乐
    const newTimeInSec = (percent / 100) * duration / 1000
    audioRef.current && (audioRef.current.currentTime = newTimeInSec)
  
    setIsDragging(false)
  }, [duration])

  return (
    <PlayerBarWrapper className='sprite_player_bar'>
      <div className='content wrap-v2'>
        <PlayerControl>
          <button className='sprite_player_bar prev' onClick={e => handleChangeMusic(false)}/>
          <PlayButton className='sprite_player_bar play' isPlaying={isPlaying} onClick={handlePlayMusic}/>
          <button className='sprite_player_bar next' onClick={e => handleChangeMusic()}/>
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
                onChange={handleProgressChange}
                onAfterChange={handleProgressAfterChange}
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
            <button className='sprite_player_bar btn playlist'>1</button>
          </div>
        </PlayerAction>
      </div>
      <audio ref={audioRef} onTimeUpdate={handlePlayerTimeUpdate}/>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)