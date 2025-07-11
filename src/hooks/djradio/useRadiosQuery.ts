import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Radio } from '@/types/djradio'

interface RadiosApiResponse {
  djRadios: Radio[]
  code: number
}

// 电台 - 推荐，type: 电台类型，对应分类 id
export const useRadiosQuery = (type: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['radios', type],
    queryFn: async () => {
      const { data } = await axios.get<RadiosApiResponse>(
        '/dj/recommend/type',
        {
          params: {
            type,
          },
        }
      )

      return data.djRadios.slice(0, 5)
    },
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
