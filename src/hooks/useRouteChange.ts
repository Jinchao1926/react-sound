import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { usePlayerContext } from '@/providers/PlayerProvider'

export const useRouteChange = () => {
  const location = useLocation()
  const { closePlaylistPannel } = usePlayerContext()

  // Close playlist panel when route changes
  useEffect(() => {
    closePlaylistPannel()
  }, [location.pathname, closePlaylistPannel])
}
