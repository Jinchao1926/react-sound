import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Radio } from '@/types/djradio'

interface RadioDetailApiResponse {
  data: Radio
  code: number
}

/**
 * 电台 - 详情
 * 说明 : 登录后调用此接口 , 传入`rid`, 可获得对应电台的详情介绍
 * 必选参数 : `rid`: 电台 的 id
 */
export const useRadioDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['radioDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<RadioDetailApiResponse>('/dj/detail', {
        params: {
          rid: id,
        },
      })
      return data.data
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
