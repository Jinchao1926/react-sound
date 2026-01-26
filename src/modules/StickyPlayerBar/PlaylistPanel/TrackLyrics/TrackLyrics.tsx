import { useEffect, useMemo, useRef, type FC } from 'react'

import { useSongLyricQuery } from '@/hooks/song/useSongLyricQuery'
import { usePlayerContext } from '@/providers/PlayerProvider'

import {
  TrackLyric,
  TrackLyricsContent,
  TrackLyricsWrapper,
} from './TrackLyrics.styles'

const ANIMATION_DURATION = 1000 // ms
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export const TrackLyrics: FC = () => {
  const {
    state: { currentTrack, currentLyricLineIndex, playlist },
  } = usePlayerContext()

  const track = useMemo(() => {
    if (currentTrack) return currentTrack

    if (playlist.length > 0) return playlist[0]

    return undefined
  }, [currentTrack, playlist])

  const { data: lyric } = useSongLyricQuery(track?.id)

  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLParagraphElement>(null)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const container = containerRef.current
    const activeEl = activeRef.current

    if (!container || !activeEl) return

    // 取消上一个动画
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
    }

    const containerHeight = container.clientHeight
    const activeHeight = activeEl.offsetHeight

    // 使用 getBoundingClientRect 计算容器内的相对位置
    const rect = activeEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const activeRelativePosition =
      rect.top - containerRect.top + container.scrollTop

    const targetScrollTop =
      activeRelativePosition - (containerHeight - activeHeight) / 2

    const startScrollTop = container.scrollTop
    const distance = targetScrollTop - startScrollTop
    const startTime = performance.now()

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1)

      container.scrollTop = startScrollTop + distance * easeOutCubic(progress)

      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animateScroll)
      }
    }

    animationIdRef.current = requestAnimationFrame(animateScroll)
  }, [currentLyricLineIndex])

  return (
    <TrackLyricsWrapper>
      <TrackLyricsContent ref={containerRef}>
        {lyric.map((item, idx) => (
          <TrackLyric
            key={item.time}
            ref={idx === currentLyricLineIndex ? activeRef : null}
            highlight={currentLyricLineIndex === idx}
          >
            {item.text}
          </TrackLyric>
        ))}
      </TrackLyricsContent>
    </TrackLyricsWrapper>
  )
}
