import { useMemo } from 'react'

import { useLocation } from 'react-router-dom'

export const useUrlParams = () => {
  const location = useLocation()

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  return queryParams
}
