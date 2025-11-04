import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

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
  onChange?: (percent: number) => void // callback function when the progress bar changes, 50 means 50%
  onAfterChange?: (percent: number) => void // callback function after the progress bar changes, 50 means 50%
}

export const ProgressBar: FC<IProgressBarProps> = ({
  width = 466,
  played,
  loaded = 0,
  onChange,
  onAfterChange,
}) => {
  const [curPercentage, setCurPercentage] = useState(played)
  const [isDragging, setIsDragging] = useState(false)
  const fullRef = useRef<HTMLDivElement>(null)

  const loadedPercentage = useMemo(() => {
    return Math.min(roundToDecimal(loaded, 0.5), 100)
  }, [loaded])

  // 更新播放进度条
  useEffect(() => {
    const newPercent = roundToDecimal(played, 0.5)
    setCurPercentage(newPercent)
  }, [played])

  // Mouse events
  function moveProgress(e: React.MouseEvent) {
    if (!fullRef.current) return

    const { left, width } = fullRef.current.getBoundingClientRect()
    let newPercent = (e.clientX - left) / width
    newPercent = 100 * Math.min(Math.max(newPercent, 0), 1) // [0,1]
    newPercent = roundToDecimal(newPercent, 0.5)
    // curPercentRef.current = newPercent
    setCurPercentage(newPercent)

    if (newPercent === played) return
    onChange?.(newPercent)
  }

  function handleProgressClick(e: React.MouseEvent) {
    moveProgress(e)
    setTimeout(() => {
      onAfterChange?.(curPercentage)
    }, 0)
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return
    moveProgress(e)
  }
  function handleMouseDown() {
    setIsDragging(true)
  }
  function handleMouseUp() {
    setIsDragging(false)
  }
  // Mouse events Ends

  return (
    <ProgressBarFull
      width={width}
      ref={fullRef}
      onClick={(e: React.MouseEvent) => handleProgressClick(e)}
    >
      <ProgressBarLoaded percent={loadedPercentage} />
      <ProgressBarCur percent={curPercentage}>
        <ProgressBarDot
          onMouseDown={() => handleMouseDown()}
          onMouseMove={(e: React.MouseEvent) => handleMouseMove(e)}
          onMouseUp={() => handleMouseUp()}
          onMouseLeave={() => handleMouseUp()}
        />
      </ProgressBarCur>
    </ProgressBarFull>
  )
}
