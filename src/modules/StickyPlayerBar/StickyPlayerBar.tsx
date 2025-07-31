import React, { FC, useState, useRef, useEffect, useCallback } from 'react'

import classNames from 'classnames'

import { Player } from './Player'
import { StickyPlayerBarWrapper } from './StickyPlayerBar.styles'

export const StickyPlayerBar: FC = () => {
  const [isLocked, setIsLocked] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const showPlayer = useCallback(() => {
    if (isLocked || !wrapperRef.current) return

    wrapperRef.current.style.transitionDuration = '0.1s'
    wrapperRef.current.style.bottom = '0px'
  }, [isLocked])

  const hidePlayer = useCallback(() => {
    if (isLocked || !wrapperRef.current) return

    wrapperRef.current.style.transitionDuration = '0.3s'
    wrapperRef.current.style.bottom = '-46px'
  }, [isLocked])

  // Initialize player position on first render
  useEffect(() => {
    if (!isLocked) {
      showPlayer()

      // hide after 3 seconds if not locked
      const timer = setTimeout(() => {
        if (isLocked) return
        hidePlayer()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isLocked, showPlayer, hidePlayer])

  return (
    <StickyPlayerBarWrapper
      ref={wrapperRef}
      onMouseEnter={showPlayer}
      onMouseLeave={hidePlayer}
      data-locked={isLocked}
    >
      <Player />
      <button
        className="sprite_player_bar lock"
        onClick={() => setIsLocked((prev) => !prev)}
        aria-label={isLocked ? 'Unlock player' : 'Lock player'}
        title={isLocked ? 'Unlock player' : 'Lock player'}
      >
        <div
          className={classNames(
            'sprite_player_bar',
            isLocked ? 'lock-icon' : 'unlock-icon'
          )}
        />
      </button>
    </StickyPlayerBarWrapper>
  )
}
