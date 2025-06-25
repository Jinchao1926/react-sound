import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import classNames from 'classnames'

import Player from './player'
import { LockablePlayerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const LockablePlayer: FC<IProps> = () => {
  const [isLocked, setIsLocked] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const switchLockedState = () => {
    setIsLocked(!isLocked)
  }
  const handleMouseEnter = () => {
    if (isLocked) return

    if (!wrapperRef.current) return
    wrapperRef.current.style.bottom = '0px'
  }
  const handleMouseLeave = () => {
    if (isLocked) return

    setTimeout(() => {
      if (!wrapperRef.current) return
      wrapperRef.current.style.bottom = '-46px'
    }, 300)
  }

  // 第一次渲染时，调整非锁定态下的播放器位置
  useEffect(() => {
    if (!isLocked) {
      handleMouseLeave()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <LockablePlayerWrapper
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Player />
      <div className="sprite_player_bar lock" onClick={switchLockedState}>
        <div
          className={classNames(
            'sprite_player_bar',
            isLocked ? 'lock-icon' : 'unlock-icon'
          )}
        />
      </div>
    </LockablePlayerWrapper>
  )
}

export default memo(LockablePlayer)
