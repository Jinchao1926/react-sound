import { useMemo } from 'react'

import { DEFAULT_AREA } from '@/constants/area'
import { useUrlParams } from '@/hooks/useUrlParams'

export const useSelectedArea = () => {
  const queryParams = useUrlParams()
  const area = useMemo(
    () => queryParams.get('area') || DEFAULT_AREA,
    [queryParams]
  )

  return {
    selectedArea: area,
  }
}
