import React, { FC, useRef, useEffect, useCallback } from 'react'

import classNames from 'classnames'

import { usePlayerContext } from '@/providers/PlayerProvider'

import { Player } from './Player'
import { StickyPlayerBarWrapper } from './StickyPlayerBar.styles'

export const StickyPlayerBar: FC = () => {
  const {
    state: { isPinned },
    togglePinned,
  } = usePlayerContext()

  const wrapperRef = useRef<HTMLDivElement>(null)

  const showPlayer = useCallback(() => {
    if (isPinned || !wrapperRef.current) return

    wrapperRef.current.style.transitionDuration = '0.1s'
    wrapperRef.current.style.bottom = '0px'
  }, [isPinned])

  const hidePlayer = useCallback(() => {
    if (isPinned || !wrapperRef.current) return

    wrapperRef.current.style.transitionDuration = '0.3s'
    wrapperRef.current.style.bottom = '-46px'
  }, [isPinned])

  // Initialize player position on first render
  useEffect(() => {
    if (!isPinned) {
      showPlayer()

      // hide after 3 seconds if not locked
      const timer = setTimeout(() => {
        if (isPinned) return
        hidePlayer()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isPinned, showPlayer, hidePlayer])

  return (
    <StickyPlayerBarWrapper
      ref={wrapperRef}
      onMouseEnter={showPlayer}
      onMouseLeave={hidePlayer}
      data-pinned={isPinned}
    >
      <Player />
      <button
        className="sprite_player_bar lock"
        onClick={togglePinned}
        aria-label={isPinned ? 'Unlock player' : 'Lock player'}
        title={isPinned ? 'Unlock player' : 'Lock player'}
      >
        <div
          className={classNames(
            'sprite_player_bar',
            isPinned ? 'lock-icon' : 'unlock-icon'
          )}
        />
      </button>
    </StickyPlayerBarWrapper>
  )
}
