import { useMemo } from 'react'

import { useUrlParams } from '@/hooks/useUrlParams'

export const useQueryParamId = () => {
  const queryParams = useUrlParams()
  const id = useMemo(() => queryParams.get('id'), [queryParams])

  return {
    id: id ? Number(id) : undefined,
  }
}
