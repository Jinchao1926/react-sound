import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Radio } from '@/types/djradio'

interface TopRadiosApiResponse {
  djRadios: Radio[]
  code: number
  count: number
  hasMore: boolean
}

export const useTopRadiosQuery = (options: {
  cateId: number
  offset?: number
  limit?: number
}) => {
  const { cateId, offset = 0, limit = 30 } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['topRadios', cateId, offset, limit],
    queryFn: async () => {
      const { data } = await axios.get<TopRadiosApiResponse>('/dj/radio/hot', {
        params: {
          cateId,
          offset,
          limit,
        },
      })

      return data
    },
  })
  return {
    ...queryResult,
    data: queryResult.data?.djRadios || [],
    count: queryResult.data?.count || 0,
    hasMore: queryResult.data?.hasMore || false,
  }
}
