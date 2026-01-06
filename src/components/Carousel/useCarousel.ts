import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCarouselProps {
  /** Total number of slides */
  total: number
  /** Auto play interval in milliseconds */
  autoplay?: boolean
  /** Auto play interval duration (default: 3000ms) */
  autoplaySpeed?: number
  /** Pause auto play on hover */
  pauseOnHover?: boolean
  /** Callback before slide change */
  beforeChange?: (from: number, to: number) => void
  /** Callback after slide change */
  afterChange?: (to: number) => void
}

interface UseCarouselReturn {
  /** Current active slide index */
  currentIndex: number
  /** Go to previous slide */
  prev: () => void
  /** Go to next slide */
  next: () => void
  /** Go to specific slide */
  goTo: (index: number) => void
  /** Whether autoplay is paused */
  isPaused: boolean
  /** Pause autoplay */
  pause: () => void
  /** Resume autoplay */
  resume: () => void
}

/**
 * Core carousel logic hook
 * Handles slide navigation, autoplay, and callbacks
 */
export const useCarousel = ({
  total,
  autoplay = false,
  autoplaySpeed = 3000,
  pauseOnHover = false,
  beforeChange,
  afterChange,
}: UseCarouselProps): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Navigate to specific slide
  const goTo = useCallback(
    (index: number) => {
      if (index === currentIndex || index < 0 || index >= total) return

      beforeChange?.(currentIndex, index)
      setCurrentIndex(index)
      afterChange?.(index)
    },
    [currentIndex, total, beforeChange, afterChange]
  )

  // Go to next slide
  const next = useCallback(() => {
    const nextIndex = (currentIndex + 1) % total
    goTo(nextIndex)
  }, [currentIndex, total, goTo])

  // Go to previous slide
  const prev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + total) % total
    goTo(prevIndex)
  }, [currentIndex, total, goTo])

  // Pause autoplay
  const pause = useCallback(() => {
    setIsPaused(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Resume autoplay
  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || isPaused || total <= 1) return

    timerRef.current = setInterval(() => {
      next()
    }, autoplaySpeed)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoplay, isPaused, total, autoplaySpeed, next])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    currentIndex,
    prev,
    next,
    goTo,
    isPaused,
    pause,
    resume,
  }
}
