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
  /** Enable infinite loop */
  infinite?: boolean
  /** Callback before slide change */
  beforeChange?: (from: number, to: number) => void
  /** Callback after slide change */
  afterChange?: (to: number) => void
}

interface UseCarouselReturn {
  /** Current active slide index */
  currentIndex: number
  /** Display index for animation (can be outside bounds for seamless loop) */
  displayIndex: number
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
  /** Reset display index after transition */
  resetDisplayIndex: () => void
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
  infinite = true,
  beforeChange,
  afterChange,
}: UseCarouselProps): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Navigate to specific slide
  const goTo = useCallback(
    (index: number) => {
      if (index === currentIndex || index < 0 || index >= total) return

      beforeChange?.(currentIndex, index)
      setCurrentIndex(index)
      setDisplayIndex(index)
      afterChange?.(index)
    },
    [currentIndex, total, beforeChange, afterChange]
  )

  // Go to next slide
  const next = useCallback(() => {
    if (!infinite && currentIndex >= total - 1) return // Stop at last slide if not infinite

    const nextIndex = (currentIndex + 1) % total

    beforeChange?.(currentIndex, nextIndex)

    // For infinite mode: if wrapping from last to first, animate to clone position
    if (infinite && currentIndex === total - 1 && nextIndex === 0) {
      setDisplayIndex(total) // Animate to clone of first (at position total)
    } else {
      setDisplayIndex(nextIndex)
    }
    setCurrentIndex(nextIndex)
    afterChange?.(nextIndex)
  }, [currentIndex, total, infinite, beforeChange, afterChange])

  // Go to previous slide
  const prev = useCallback(() => {
    if (!infinite && currentIndex <= 0) return // Stop at first slide if not infinite

    const prevIndex = (currentIndex - 1 + total) % total

    beforeChange?.(currentIndex, prevIndex)

    // For infinite mode: if wrapping from first to last, animate to clone position
    if (infinite && currentIndex === 0 && prevIndex === total - 1) {
      setDisplayIndex(-1) // Animate to clone of last (at position -1)
    } else {
      setDisplayIndex(prevIndex)
    }
    setCurrentIndex(prevIndex)
    afterChange?.(prevIndex)
  }, [currentIndex, total, infinite, beforeChange, afterChange])

  // Reset display index to current index (called after transition ends)
  const resetDisplayIndex = useCallback(() => {
    if (displayIndex !== currentIndex) {
      setDisplayIndex(currentIndex)
    }
  }, [displayIndex, currentIndex])

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
    displayIndex,
    prev,
    next,
    goTo,
    isPaused,
    pause,
    resume,
    resetDisplayIndex,
  }
}
