import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { NavLink } from 'react-router-dom'

import { UserLink } from '@/components/UserLink'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { PLAY_MODE } from '@/types/player'
import { formatTime, getMusicUrl } from '@/utils/formatPlayer'
import { formatSizedImage } from '@/utils/formatUtils'

import {
  PlayButton,
  PlayerControl,
  PlayerInfo,
  PlayerProgressBar,
  PlayerWrapper,
} from './Player.styles'
import { PlayerAction } from '../PlayerAction'
import { ProgressBar } from '../ProgressBar'

export const Player: FC = () => {
  // If dragging, do not update progress bar based on audio time
  const [isDragging, setIsDragging] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // ms
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    state: {
      currentSong,
      currentLyric,
      currentLyricLineIndex,
      isPlaying,
      playMode,
    },
    switchSong,
    togglePlayState,
    changeLyricLineIndex,
  } = usePlayerContext()

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
  // Lyric Scroll - Using binary search
  const handleLyric = useCallback(
    (time: number) => {
      if (!currentLyric || currentLyric.length === 0) return

      // Binary search for the correct lyric line
      const findLyricIndex = (targetTime: number): number => {
        let left = 0
        let right = currentLyric.length - 1
        let result = -1

        while (left <= right) {
          const mid = Math.floor((left + right) / 2)

          if (currentLyric[mid].time <= targetTime) {
            result = mid
            left = mid + 1
          } else {
            right = mid - 1
          }
        }

        return result
      }

      const newIndex = findLyricIndex(time)
      if (newIndex !== currentLyricLineIndex && newIndex >= 0) {
        // console.log(
        //   'jinchao time:',
        //   time,
        //   'newIndex:',
        //   newIndex,
        //   'lyric:',
        //   currentLyric[newIndex]
        // )
        changeLyricLineIndex(newIndex)
      }
    },
    [currentLyric, currentLyricLineIndex, changeLyricLineIndex]
  )
  // ========== Player Control Handlers End ==========

  // Progress & Time Update
  const handlePlayerTimeUpdate = useCallback(
    (e: React.SyntheticEvent) => {
      // playing time updating... if dragging progress bar, do not update progress bar
      if (isDragging) return

      const target = e.target as HTMLAudioElement
      const newTime = Math.min(target.currentTime * 1000, duration) // ms
      setCurrentTime(newTime)
      setProgress((newTime / duration) * 100)

      // find lyric position
      handleLyric(newTime)
    },
    [isDragging, duration, handleLyric]
  )

  const handleProgressChange = useCallback(
    (percent: number) => {
      // progress changing...
      setIsDragging(true)

      const newTime = (percent * duration) / 100
      setCurrentTime(newTime)
      setProgress(percent)
    },
    [duration]
  )

  const handleProgressAfterChange = useCallback(
    (percent: number) => {
      // progress bar changed, play music
      const newTimeInSec = ((percent / 100) * duration) / 1000
      audioRef.current && (audioRef.current.currentTime = newTimeInSec)

      setIsDragging(false)
    },
    [duration]
  )

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
        onEnded={() => {
          if (playMode === PLAY_MODE.SINGLE_LOOP) {
            if (audioRef.current) {
              audioRef.current.currentTime = 0
              audioRef.current.play()
            }
          } else {
            switchSong(true)
          }
        }}
      />
    </PlayerWrapper>
  )
}
