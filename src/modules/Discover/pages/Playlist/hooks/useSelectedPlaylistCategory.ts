import { useMemo } from 'react'

import { useUrlParams } from '@/hooks/useUrlParams'

export const useSelectedPlaylistCategory = () => {
  const queryParams = useUrlParams()
  const category = useMemo(
    () => queryParams.get('cat') || '全部',
    [queryParams]
  )

  return {
    selectedCategory: category,
  }
}
