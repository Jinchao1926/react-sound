import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'

import { roundToDecimal } from '@/utils/dataFormat'

import {
  ProgressBarCur,
  ProgressBarDot,
  ProgressBarFull,
  ProgressBarLoaded,
} from './ProgressBar.styles'

interface IProgressBarProps {
  width?: number // the width of the progress bar, defaults to 466
  played: number // 50 means 50% played
  loaded?: number // 50 means 50% loaded/buffered
  onChange?: (percent: number) => void // callback function when the progress bar is changing, 50 means 50%
  onAfterChange?: (percent: number) => void // callback function after the progress bar is changed, 50 means 50%
}

export const ProgressBar: FC<IProgressBarProps> = ({
  width = 466,
  played,
  loaded = 0,
  onChange,
  onAfterChange,
}) => {
  const fullRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const lastEmittedPercentRef = useRef(played)

  const loadedPercentage = useMemo(() => {
    return Math.min(roundToDecimal(loaded, 0.5), 100)
  }, [loaded])

  const playedPercentage = useMemo(() => {
    return Math.min(roundToDecimal(played, 0.5), 100)
  }, [played])

  useEffect(() => {
    if (!isDraggingRef.current) {
      lastEmittedPercentRef.current = playedPercentage
    }
  }, [playedPercentage])

  // Calculate and update progress
  const calculateProgress = useCallback((clientX: number): number | null => {
    if (!fullRef.current) return null

    const { left, width } = fullRef.current.getBoundingClientRect()
    let ratio = (clientX - left) / width
    ratio = Math.min(Math.max(ratio, 0), 1) // [0, 1]

    return roundToDecimal(ratio * 100, 0.5)
  }, [])

  // Handle progress bar click
  const handleProgressClick = useCallback(
    (e: React.MouseEvent) => {
      // Do not handle click event if dragging (avoid conflict with dragging)
      if (isDraggingRef.current) return

      const newPercent = calculateProgress(e.clientX)
      if (newPercent && newPercent !== lastEmittedPercentRef.current) {
        onChange?.(newPercent)
        lastEmittedPercentRef.current = newPercent
        onAfterChange?.(newPercent)
      }
    },
    [calculateProgress, onChange, onAfterChange]
  )

  // Handle dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      isDraggingRef.current = true

      // Handle mouse move during dragging
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDraggingRef.current) return

        const newPercent = calculateProgress(moveEvent.clientX)
        if (newPercent && newPercent !== lastEmittedPercentRef.current) {
          onChange?.(newPercent)
          lastEmittedPercentRef.current = newPercent
        }
      }

      // Handle dragging end
      const handleMouseUp = () => {
        if (isDraggingRef.current) {
          isDraggingRef.current = false
          onAfterChange?.(lastEmittedPercentRef.current)
        }

        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [calculateProgress, onChange, onAfterChange]
  )

  return (
    <ProgressBarFull width={width} ref={fullRef} onClick={handleProgressClick}>
      <ProgressBarLoaded percent={loadedPercentage} />
      <ProgressBarCur percent={playedPercentage}>
        <ProgressBarDot onMouseDown={handleMouseDown} />
      </ProgressBarCur>
    </ProgressBarFull>
  )
}
