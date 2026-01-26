import { type FC, useRef, useEffect, useCallback } from 'react'

import { usePlayerContext } from '@/providers/PlayerProvider'

import { PlaylistPanel } from './PlaylistPanel'
import {
  LockBarButton,
  LockIcon,
  Player,
  StickyPlayerBarWrapper,
} from './StickyPlayerBar.styles'

export const StickyPlayerBar: FC = () => {
  const {
    state: { isPlayerPinned, showPlaylistPannel },
    togglePlayerPinned,
  } = usePlayerContext()

  const wrapperRef = useRef<HTMLDivElement>(null)

  const showPlayer = useCallback(() => {
    if (isPlayerPinned || !wrapperRef.current) return

    wrapperRef.current.style.transitionDuration = '0.1s'
    wrapperRef.current.style.bottom = '0px'
  }, [isPlayerPinned])

  const hidePlayer = useCallback(() => {
    if (isPlayerPinned || !wrapperRef.current) return

    wrapperRef.current.style.transitionDuration = '0.3s'
    wrapperRef.current.style.bottom = '-46px'
  }, [isPlayerPinned])

  // Initialize player position on first render
  useEffect(() => {
    if (!isPlayerPinned) {
      showPlayer()

      // hide after 3 seconds if not locked
      const timer = setTimeout(() => {
        if (isPlayerPinned) return
        hidePlayer()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isPlayerPinned, showPlayer, hidePlayer])

  return (
    <StickyPlayerBarWrapper
      ref={wrapperRef}
      onMouseEnter={showPlayer}
      onMouseLeave={hidePlayer}
      data-pinned={isPlayerPinned}
    >
      {showPlaylistPannel && <PlaylistPanel />}
      <Player />

      <LockBarButton
        onClick={togglePlayerPinned}
        aria-label={isPlayerPinned ? 'Unlock player' : 'Lock player'}
        title={isPlayerPinned ? 'Unlock player' : 'Lock player'}
      >
        <LockIcon isLocked={isPlayerPinned} />
      </LockBarButton>
    </StickyPlayerBarWrapper>
  )
}
