import type { FC, ReactNode } from 'react'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { UserLink } from '@/components/UserLink'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { useAppDispatch, useAppSelector } from '@/store'
import { formatTime, getMusicUrl } from '@/utils/format-player'
import { formatSizedImage } from '@/utils/format-utils'

import {
  PlayButton,
  PlayerControl,
  PlayerInfo,
  PlayerProgressBar,
  PlayerWrapper,
} from './style'
import PlayerAction from '../player-action'
import ProgressBar from '../progress-bar'
import { changeLyricLineIndexAction, switchSongAction } from '../store'

interface IProps {
  children?: ReactNode
}

// 播放器
const Player: FC<IProps> = () => {
  // 标识进度条是否在拖动，防止在音频播放过程中 & 拖动进度条时，进度条操作的冲突
  const [isDragging, setIsDragging] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // ms
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    state: { currentSong, isPlaying },
    switchSong,
    togglePlayState,
  } = usePlayerContext()

  // redux
  const {
    // currentSong,
    currentLyric,
    lyricLineIndex,
    // isPlaying,
    playMode,
  } = useAppSelector(
    (state) => ({
      // currentSong: state.player.currentSong,
      currentLyric: state.player.currentLyric,
      lyricLineIndex: state.player.lyricLineIndex,
      // isPlaying: state.player.isPlaying,
      playMode: state.player.playMode,
    }),
    shallowEqual
  )
  const dispatch = useAppDispatch()

  const { songSrc, songDetailUrl, songAvatar, duration } = useMemo(() => {
    return {
      songSrc: currentSong ? getMusicUrl(currentSong.id) : undefined,
      songDetailUrl: currentSong ? `/song?id=${currentSong.id}` : '',
      songAvatar: currentSong
        ? formatSizedImage(currentSong.al.picUrl, 35)
        : require('@/assets/img/default_album.png'),
      duration: currentSong ? currentSong.dt : 0, // ms
    }
  }, [currentSong])

  useEffect(() => {
    if (!audioRef.current) return

    if (!songSrc) {
      audioRef.current.src = ''
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      return
    }

    // Switch song - 切歌
    if (songSrc !== audioRef.current.src) {
      audioRef.current.src = songSrc
      audioRef.current.load()

      if (isPlaying) {
        audioRef.current.currentTime = 0
      }
    }

    // Toggle play state - 播放/暂停
    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Play music successfully')
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error('Play music failed:', e)
        })
    } else {
      audioRef.current.pause()
    }
  }, [songSrc, isPlaying])

  // ========== Player Control Handlers ==========
  // 歌词滚动
  const handleLyric = useCallback(
    (time: number) => {
      if (!currentLyric) return
      for (let idx = lyricLineIndex; idx < currentLyric.length; idx++) {
        const lyricItem = currentLyric[idx]
        if (time < lyricItem.time) {
          if (idx - 1 !== lyricLineIndex) {
            // console.log("Lyric:", currentLyric[idx - 1])
            dispatch(changeLyricLineIndexAction(idx - 1))
          }
          break
        }
      }
    },
    [currentLyric, lyricLineIndex, dispatch]
  )
  // ========== Player Control Handlers End ==========

  // ========== Audio Handlers ==========
  // 播放结束
  const handlePlayerEnded = useCallback(() => {
    // 单曲循环
    if (playMode === 'single-loop') {
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
      return
    }
    dispatch(switchSongAction(true)).then((res) => {
      // 如果切歌失败，直接播放当前歌曲 eg：播放列表只有一首歌
      if (res.payload) return
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    })
  }, [dispatch, playMode])

  // 播放回调
  const handlePlayerTimeUpdate = useCallback(
    (e: React.SyntheticEvent) => {
      // 播放时间更新中... 如果这时候在拖动进度条，就不根据播放时间更新进度条
      if (isDragging) return

      const target = e.target as HTMLAudioElement
      const newTime = Math.min(target.currentTime * 1000, duration) // ms
      setCurrentTime(newTime)
      setProgress((newTime / duration) * 100)

      // 查找歌词位置
      handleLyric(newTime)
    },
    [isDragging, duration, handleLyric]
  )
  // ========== Audio Handlers End ==========

  // ========== Progress Handlers ==========
  const handleProgressChange = useCallback(
    (percent: number) => {
      // 进度条变化中...
      setIsDragging(true)

      const newTime = (percent * duration) / 100
      setCurrentTime(newTime)
      setProgress(percent)
    },
    [duration]
  )

  const handleProgressAfterChange = useCallback(
    (percent: number) => {
      // 进度条变化结束后播放音乐
      const newTimeInSec = ((percent / 100) * duration) / 1000
      audioRef.current && (audioRef.current.currentTime = newTimeInSec)

      setIsDragging(false)
    },
    [duration]
  )
  // ========== Progress Handlers End ==========

  return (
    <PlayerWrapper className="sprite_player_bar player">
      <div className="content wrap-v2">
        <PlayerControl>
          <button
            className="sprite_player_bar prev"
            onClick={() => switchSong(false)}
          />
          <PlayButton
            className="sprite_player_bar play"
            isPlaying={isPlaying}
            onClick={() => togglePlayState()}
          />
          <button
            className="sprite_player_bar next"
            onClick={() => switchSong(true)}
          />
        </PlayerControl>
        <PlayerInfo>
          <div className="avatar">
            <img src={songAvatar} alt="" />
            <NavLink className="sprite_player_bar" to={songDetailUrl} />
          </div>
          <div className="info">
            <div className="music">
              <NavLink className="name no-wrap" to={songDetailUrl}>
                {currentSong?.name}
              </NavLink>
              {currentSong?.ar && <UserLink users={currentSong?.ar} />}
            </div>
            <PlayerProgressBar>
              <ProgressBar
                percent={progress}
                onChange={handleProgressChange}
                onAfterChange={handleProgressAfterChange}
              />
              <span className="time">
                <span className="now-time">{formatTime(currentTime)}</span>
                <span className="duration">{` / ${formatTime(duration)}`}</span>
              </span>
            </PlayerProgressBar>
          </div>
        </PlayerInfo>
        <PlayerAction />
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handlePlayerTimeUpdate}
        onEnded={handlePlayerEnded}
      />
    </PlayerWrapper>
  )
}

export default memo(Player)
