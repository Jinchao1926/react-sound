import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { 
  switchSongAction, 
  switchLyricLineIndexAction,
  switchIsPlayingAction,
} from '../store'

import { formatSizedImage } from '@/utils/format-utils'
import { formatTime, getMusicUrl } from '@/utils/format-player'

import { 
  PlayerBarWrapper,
  PlayerControl,
  PlayButton,
  PlayerInfo,
  PlayerProgressBar,
} from './style'
import ProgressBar from '../progress-bar'
import PlayerAction from './player-action'

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  // data
  const [songUrl, setSongUrl] = useState("")
  const [songAvatar, setSongAvatar] = useState("")

  // 标识进度条是否在拖动，防止在音频播放过程中 & 拖动进度条时，进度条操作的冲突
  const [isDragging, setIsDragging] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // ms
  const [duration, setDuration] = useState(0) // ms
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // redux
  const { currentSong, currentLyric, isPlaying, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentLyric: state.player.currentLyric,
      isPlaying: state.player.isPlaying,
      playMode: state.player.playMode,
    }), 
    shallowEqual
  )
  const isPlayingRef = useRef(isPlaying)
  const dispatch = useAppDispatch()

  // 监听 currentSong 变化
  useEffect(() => {
    if (currentSong) {
      setSongUrl(`/discover/song?id=${currentSong.id}`)
      setSongAvatar(formatSizedImage(currentSong.al.picUrl, 35))
      setDuration(currentSong.dt)
  
      if (audioRef.current) {
        audioRef.current.src = getMusicUrl(currentSong.id)

        // 正在播放时，切歌才自动播放歌曲
        // DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
        if (!isPlayingRef.current) return
        audioRef.current.play()
          .then(() => {
            dispatch(switchIsPlayingAction(true))
            console.log("Play music successfully")
          }).catch(err => {
            dispatch(switchIsPlayingAction(false))
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
  }, [currentSong, dispatch])

  // 监听 isPlaying 变化，会有别的页面控制播放的场景
  useEffect(() => {
    isPlayingRef.current = isPlaying
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause()
  }, [isPlaying])

  // ========== Player Control Handlers ========== 
  // 切歌（上一首/下一首）
  function handleChangeMusic(isForward: boolean = true) {
    dispatch(switchSongAction(isForward))
  }
  // 播放/暂停
  const handlePlayMusic = useCallback(() => {
    const isPaused = audioRef.current!.paused
    dispatch(switchIsPlayingAction(isPaused))
  }, [dispatch])
  // 歌词滚动
  const handleLyric = useCallback((time: number) => {
    if (!currentLyric) return
    for (let idx = 0; idx < currentLyric.length; idx++) {
      const lyricItem = currentLyric[idx]
      if (time < lyricItem.time) {
        // console.log("Lyric:", currentLyric[idx - 1])
        // dispatch(switchLyricLineIndexAction(idx - 1))
        break
      }
    }
  }, [currentLyric])
  // ========== Player Control Handlers End ========== 

  // ========== Audio Handlers ========== 
  // 播放结束
  const handlePlayerEnded = useCallback(() => {
    // 单曲循环
    if (playMode === "single-loop") {
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
      return 
    }
    dispatch(switchSongAction(true)).then(res => {
      // 如果切歌失败，直接播放当前歌曲 eg：播放列表只有一首歌
      if (res.payload) return
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    })
  }, [dispatch, playMode])

  // 播放回调
  const handlePlayerTimeUpdate = useCallback((e: React.SyntheticEvent) => {
    // 播放时间更新中... 如果这时候在拖动进度条，就不根据播放时间更新进度条
    if (isDragging) return
  
    const target = e.target as HTMLAudioElement
    const newTime = Math.min(target.currentTime * 1000, duration)// ms
    setCurrentTime(newTime)
    setProgress(newTime / duration * 100)

    // 查找歌词位置
    handleLyric(newTime)
  }, [isDragging, duration, handleLyric])
  // ========== Audio Handlers End ========== 

  // ========== Progress Handlers ========== 
  const handleProgressChange = useCallback((percent: number) => {
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
  // ========== Progress Handlers End ========== 

  return (
    <PlayerBarWrapper className='sprite_player_bar'>
      <div className='content wrap-v2'>
        <PlayerControl>
          <button className='sprite_player_bar prev' onClick={ e => handleChangeMusic(false)}/>
          <PlayButton className='sprite_player_bar play' isPlaying={isPlaying} onClick={handlePlayMusic}/>
          <button className='sprite_player_bar next' onClick={ e => handleChangeMusic(true)}/>
        </PlayerControl>
        <PlayerInfo>
          <div className='avatar'>
            <img src={songAvatar} alt='' />
            <NavLink className='sprite_player_bar' to={songUrl} />
          </div>
          <div className='info'>
            <div className='music'>
              <NavLink className='name' to={songUrl}>{currentSong?.name}</NavLink>
              <span className='singer'>
                {
                  currentSong?.ar.map((item: {id: string, name: string}, index: number) => {
                    return (
                      <React.Fragment key={item.id}>
                        { index > 0 && '/'}
                        <NavLink to={`/artist?id=${item.id}`}>{item.name}</NavLink>
                      </React.Fragment>
                    )
                  })
                }
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
        <PlayerAction />
      </div>
      <audio ref={audioRef} onTimeUpdate={handlePlayerTimeUpdate} onEnded={handlePlayerEnded}/>
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)