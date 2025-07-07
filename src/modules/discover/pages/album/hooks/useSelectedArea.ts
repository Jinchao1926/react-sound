import { useMemo } from 'react'

import { useUrlParams } from '@/hooks/useUrlParams'

export const useSelectedArea = () => {
  const queryParams = useUrlParams()
  const area = useMemo(() => queryParams.get('area') || 'ALL', [queryParams])

  return {
    selectedArea: area,
  }
}
