import type { FC } from 'react'
import type React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box, Flex, FlexContainer, Text, TextNavLink } from '@/components/Core'
import { UserLink } from '@/components/Links'
import {
  NextButton,
  Playbar,
  PlayButton,
  PrevButton,
} from '@/components/Shared/Playbar'

import defaultAlbumImg from '@/assets/img/default_album.png'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { PLAY_MODE } from '@/types/player'
import { getMusicUrl, formatSizedImage } from '@/utils/dataFormat'
import { formatTime } from '@/utils/timeFormat'

import {
  PlayerProgressBar,
  PlayerTime,
  PlayerTimeNow,
  SongCoverImage,
} from './Player.styles'
import { PlayerAction } from '../PlayerAction'
import { ProgressBar } from '../ProgressBar'

export const Player: FC = () => {
  // If dragging, do not update progress bar based on audio time
  const [isDragging, setIsDragging] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // ms
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(0) // loaded/buffered progress percentage
  const audioRef = useRef<HTMLAudioElement>(null)

  // Throttle
  const lastProgressUpdateRef = useRef(0)
  const lastLyricUpdateRef = useRef(0)
  const currentLyricLineIndexRef = useRef(0)

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

  // 同步 ref 以避免闭包问题
  useEffect(() => {
    currentLyricLineIndexRef.current = currentLyricLineIndex
  }, [currentLyricLineIndex])

  const { songSrc, songDetailUrl, songAvatar, duration } = useMemo(() => {
    return {
      songSrc: currentSong ? getMusicUrl(currentSong.id) : undefined,
      songDetailUrl: currentSong ? `/song?id=${currentSong.id}` : '',
      songAvatar: currentSong
        ? formatSizedImage(currentSong.al.picUrl, 35)
        : defaultAlbumImg,
      duration: currentSong ? currentSong.dt : 0, // ms
    }
  }, [currentSong])

  useEffect(() => {
    if (!audioRef.current) return

    if (!songSrc) {
      audioRef.current.src = ''
      audioRef.current.pause()
      audioRef.current.currentTime = 0

      setLoaded(0)
      setProgress(0)
      setCurrentTime(0)
      return
    }

    // Switch song - 切歌
    if (songSrc !== audioRef.current.src) {
      audioRef.current.src = songSrc
      audioRef.current.load()

      // Reset all timers
      lastProgressUpdateRef.current = 0
      lastLyricUpdateRef.current = 0

      if (isPlaying) {
        audioRef.current.currentTime = 0
      }

      setLoaded(0)
      setProgress(0)
      setCurrentTime(0)
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
      if (newIndex !== currentLyricLineIndexRef.current && newIndex >= 0) {
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
    [currentLyric, changeLyricLineIndex]
  )

  // ========== Player Control Handlers End ==========

  // Progress & Time Update
  const handlePlayerTimeUpdate = useCallback(
    (e: React.SyntheticEvent) => {
      // playing time updating... if dragging progress bar, do not update progress bar
      if (isDragging) return

      const target = e.target as HTMLAudioElement
      const newTime = Math.min(target.currentTime * 1000, duration) // ms

      // Throttle: only update progress if time changes by more than 100ms
      const timeDiff = Math.abs(newTime - lastProgressUpdateRef.current)
      if (timeDiff >= 100) {
        setCurrentTime(newTime)
        setProgress((newTime / duration) * 100)
        lastProgressUpdateRef.current = newTime
      }

      // Throttle: only update lyric if time changes by more than 500ms
      const lyricTimeDiff = Math.abs(newTime - lastLyricUpdateRef.current)
      if (lyricTimeDiff >= 500) {
        handleLyric(newTime)
        lastLyricUpdateRef.current = newTime
      }
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

      // Reset timers, force update lyric
      const newTime = (percent * duration) / 100
      lastProgressUpdateRef.current = newTime
      lastLyricUpdateRef.current = newTime - 1000 // Force lyric check
      handleLyric(newTime)

      setIsDragging(false)
    },
    [duration, handleLyric]
  )

  // Handle audio buffer progress
  const handleAudioProgress = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as HTMLAudioElement
      if (target.buffered.length > 0 && duration > 0) {
        // Get the end of the last buffered range
        const bufferedEnd = target.buffered.end(target.buffered.length - 1)
        const loadedPercent = (bufferedEnd / (duration / 1000)) * 100
        setLoaded(Math.min(loadedPercent, 100))
      }
    },
    [duration]
  )

  return (
    <Playbar>
      <FlexContainer height={47}>
        <Flex align="center" width={137}>
          <PrevButton onClick={() => switchSong(false)} />
          <PlayButton isPlaying={isPlaying} onClick={() => togglePlayState()} />
          <NextButton onClick={() => switchSong(true)} />
        </Flex>
        <Flex align="center" flex={1} gap={15}>
          {/* Song Avatar */}
          <SongCoverImage
            src={songAvatar}
            alt={currentSong?.name}
            to={songDetailUrl}
          />
          <Box width={581} height="100%">
            {/* Music Name and Artist */}
            <Flex gap={15} height={28} lineHeight={28}>
              <TextNavLink
                to={songDetailUrl}
                color="#e8e8e8"
                maxWidth={300}
                nowrap
              >
                {currentSong?.name}
              </TextNavLink>
              {currentSong?.ar && (
                <UserLink users={currentSong?.ar} color="#9b9b9b" />
              )}
            </Flex>
            {/* Progress Bar */}
            <PlayerProgressBar>
              <ProgressBar
                played={progress}
                loaded={loaded}
                onChange={handleProgressChange}
                onAfterChange={handleProgressAfterChange}
              />
              <PlayerTime>
                <PlayerTimeNow>{formatTime(currentTime)}</PlayerTimeNow>
                <Text>{` / ${formatTime(duration)}`}</Text>
              </PlayerTime>
            </PlayerProgressBar>
          </Box>
        </Flex>
        {/* Player Actions */}
        <PlayerAction />
      </FlexContainer>
      <audio
        ref={audioRef}
        onTimeUpdate={handlePlayerTimeUpdate}
        onProgress={handleAudioProgress}
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
    </Playbar>
  )
}
