import React, { memo, useState, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'

import { ProgressBarWrapper } from './style'
import { roundToDecimal } from '@/utils/format-player'

interface IProps {
  children?: ReactNode
  width?: number // the width of the progress bar, defaults to 466
  percent: number //50 means 50%
  onChange?: (percent: number) => void // callback function when the progress bar changes, 50 means 50%
  onAfterChange?: (percent: number) => void // callback function after the progress bar changes, 50 means 50%
}

const ProgressBar: FC<IProps> = (props: IProps) => {
  const { width = 466, percent, onChange, onAfterChange } = props

  const [curPercent, setCurPercent] = useState(percent)
  const [isDragging, setIsDragging] = useState(false)
  const curPercentRef = useRef<number>(curPercent)

  const barRef = useRef<HTMLDivElement>(null)
  const fullRef = useRef<HTMLDivElement>(null)
  const curRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    barRef.current!.style.width = `${width}px`
  }, [width])

  // 更新进度条，这种写法不会重新渲染组件，只会修改 width 属性
  // 如果使用 styled-components 的话，虚拟 DOM 会重新渲染
  useEffect(() => {
    const newPercent = roundToDecimal(percent, 0.5)
    setCurPercent(newPercent)

    curRef.current!.style.width = `${newPercent}%`
  }, [percent])

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
    <ProgressBarWrapper className="sprite_progress_bar progress" ref={barRef}>
      <div
        className="sprite_progress_bar full"
        ref={fullRef}
        onClick={(e) => handleProgressClick(e)}
      />
      <div
        className="sprite_progress_bar cur"
        ref={curRef}
        onClick={(e) => handleProgressClick(e)}
      >
        <span
          className="sprite_icon dot"
          onMouseDown={() => handleMouseDown()}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={() => handleMouseUp()}
          onMouseLeave={() => handleMouseUp()}
        />
      </div>
    </ProgressBarWrapper>
  )
}

export default memo(ProgressBar)
