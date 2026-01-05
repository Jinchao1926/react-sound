import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type MVUrl } from '@/types/mv'

interface MVUrlApiResponse {
  data: MVUrl
  code: number
}

/**
 * mv 地址
 * 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * 必选参数 : `id`: mv id
 * 可选参数 : `r`: 分辨率,默认 1080,可从 `/mv/detail` 接口获取分辨率列表
 */

export const useMVUrlQuery = (id?: number, r?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['mvURL', id, r],
    queryFn: async () => {
      const { data } = await axios.get<MVUrlApiResponse>('/mv/url', {
        params: {
          id,
          r,
        },
      })
      return data.data
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
