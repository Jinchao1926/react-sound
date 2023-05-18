import React, { memo, useState, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'

import { roundToDecimal } from '@/utils/format-player'

import { ProgressBarWrapper } from './style'

interface IProps {
  children?: ReactNode,
  width?: number,   // the width of the progress bar, defaults to 466
  percent: number,  //50 means 50%
  onChange?: (percent: number) => void, // callback function when the progress bar changes, 50 means 50%
  onAfterChange?: (percent: number) => void // callback function after the progress bar changes, 50 means 50%
}

const ProgressBar: FC<IProps> = (props: IProps) => {
  const { width = 466, percent, onChange, onAfterChange } = props

  const [curPercent, setCurPercent] = useState(percent)
  const [isDragging, setIsDragging] = useState(false)
  const curPercentRef = useRef<number>(curPercent)
  const fullRef = useRef<HTMLDivElement>(null)

  // Mouse events
  function moveProgress(e: React.MouseEvent) {
    if (!fullRef.current) return
    const { left, width } = fullRef.current.getBoundingClientRect()
    let newPercent = (e.clientX - left) / width
    newPercent = 100 * Math.min(Math.max(newPercent, 0), 1) // [0,1]
    newPercent = roundToDecimal(newPercent, 0.5)
    curPercentRef.current = newPercent
    setCurPercent(newPercent)

    if (!onChange || newPercent === percent) return
    onChange(newPercent)
  }

  function handleProgressClick(e: React.MouseEvent) {
    moveProgress(e)
    console.log("handleProgressClick")
    setTimeout(() => {
      onAfterChange && onAfterChange(curPercentRef.current)
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
    <ProgressBarWrapper 
      className='sprite_progress_bar progress' 
      width={width}
      percent={curPercent}
      >
      <div className='sprite_progress_bar full' ref={fullRef} onClick={e => handleProgressClick(e)} />
      <div className='sprite_progress_bar cur' onClick={e => handleProgressClick(e)}>
        <span 
          className='sprite_icon dot' 
          onMouseDown={ e => handleMouseDown() }
          onMouseMove={ e => handleMouseMove(e) }
          onMouseUp={ e => handleMouseUp() }
          onMouseLeave={ e => handleMouseUp() }
        />
      </div>
    </ProgressBarWrapper>
  )
}

export default memo(ProgressBar)