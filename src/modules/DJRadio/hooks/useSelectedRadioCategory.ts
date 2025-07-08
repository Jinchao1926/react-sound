import { useMemo } from 'react'

import { useUrlParams } from '@/hooks/useUrlParams'

export const useSelectedRadioCategory = () => {
  const queryParams = useUrlParams()
  const categoryId = useMemo(() => queryParams.get('id'), [queryParams])

  return {
    selectedCategoryId: categoryId,
  }
}
