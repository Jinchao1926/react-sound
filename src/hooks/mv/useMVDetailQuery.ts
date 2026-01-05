import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type MV } from '@/types/mv'

interface MVDetailApiResponse {
  data: MV
  code: number
}

/**
 * 获取 mv 数据
 * 说明 : 调用此接口, 传入 mvid可获取对应 MV 数据, 其中 mv 视频网易做了防盗链处理, 可能不能直接播放,
 * 需要播放的话需要调用 'mv 地址' 接口
 * 必选参数 :** `mvid`: mv 的 id
 */

export const useMVDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['mvDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<MVDetailApiResponse>('/mv/detail', {
        params: {
          mvid: id,
        },
      })
      return data.data
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
