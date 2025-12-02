import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Radio } from '@/types/djradio'

interface RecommendedRadioApiResponse {
  data: Radio[]
  code: number
}

/**
 * 电台个性推荐
 * 说明 : 调用此接口,可获取电台个性推荐列表
 * 可选参数 :
 *  `limit` : 返回数量,默认为 6,总条数最多 6 条
 */
export const useRecommendedRadioQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['recommendedRadios'],
    queryFn: async () => {
      const { data } = await axios.get<RecommendedRadioApiResponse>(
        '/dj/personalize/recommend'
      )

      return data.data
    },
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
