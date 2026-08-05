import { useMemo } from 'react'

import { useLocation } from 'react-router'

export const useUrlParams = () => {
  const location = useLocation()

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )

  return queryParams
}
