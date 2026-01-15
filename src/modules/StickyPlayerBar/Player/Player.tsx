import type { FC } from 'react'
import type React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import defaultAlbumImg from '@/assets/img/default_album.png'
import { Box, Flex, FlexContainer, Text, TextNavLink } from '@/components/Core'
import { UserLink } from '@/components/Links'
import {
  NextButton,
  Playbar,
  PlayButton,
  PrevButton,
} from '@/components/Shared/Playbar'
import { usePlayerContext } from '@/providers/PlayerProvider'
import { routeBuilder } from '@/routers'
import { PLAY_MODE } from '@/types/player'
import { getMusicUrl, formatSizedImage } from '@/utils/format/dataFormat'
import { formatTime } from '@/utils/format/timeFormat'
import logger from '@/utils/logger'
import { findLyricIndexByTime } from '@/utils/player/lyricUtils'

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
      currentTrack,
      currentLyric,
      currentLyricLineIndex,
      isPlaying,
      playMode,
    },
    switchTrack,
    togglePlayState,
    changeLyricLineIndex,
  } = usePlayerContext()

  // 同步 ref 以避免闭包问题
  useEffect(() => {
    currentLyricLineIndexRef.current = currentLyricLineIndex
  }, [currentLyricLineIndex])

  const { songSrc, songDetailUrl, songAvatar, duration } = useMemo(() => {
    return {
      songSrc: currentTrack ? getMusicUrl(currentTrack.id) : undefined,
      songDetailUrl: currentTrack ? routeBuilder.song(currentTrack.id) : '',
      songAvatar: currentTrack
        ? formatSizedImage(currentTrack.al.picUrl, 35)
        : defaultAlbumImg,
      duration: currentTrack ? currentTrack.dt : 0, // ms
    }
  }, [currentTrack])

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
          // Playback started successfully
        })
        .catch((e) => {
          logger.error('Play music failed:', e)
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

      const newIndex = findLyricIndexByTime(currentLyric, time)
      if (newIndex !== currentLyricLineIndexRef.current && newIndex >= 0) {
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
          <PrevButton onClick={() => switchTrack(false)} />
          <PlayButton isPlaying={isPlaying} onClick={() => togglePlayState()} />
          <NextButton onClick={() => switchTrack(true)} />
        </Flex>
        <Flex align="center" flex={1} gap={15}>
          {/* Song Avatar */}
          <SongCoverImage
            src={songAvatar}
            alt={currentTrack?.name}
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
                {currentTrack?.name}
              </TextNavLink>
              {currentTrack?.ar && (
                <UserLink users={currentTrack?.ar} color="#9b9b9b" />
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
      {}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
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
            switchTrack(true)
          }
        }}
      />
    </Playbar>
  )
}
