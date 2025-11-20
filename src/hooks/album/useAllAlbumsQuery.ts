import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Album } from '@/types/music'

interface AllAlbumsApiResponse {
  albums: Album[]
  code: number
  total: number
}

/**
 * 全部新碟
 * 说明 : 登录后调用此接口 ,可获取全部新碟
 * 可选参数 :
 * `limit` : 返回数量 , 默认为 30
 * `offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
 * `area` : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 */
export const useAllAlbumsQuery = (options: {
  area: string
  offset?: number
  limit?: number
}) => {
  const { area, offset = 0, limit = 10 } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['allAlbums', { area, offset, limit }],
    queryFn: async () => {
      const { data } = await axios.get<AllAlbumsApiResponse>('/album/new', {
        params: { area, offset, limit },
      })
      return data
    },
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data?.albums || [],
    total: queryResult.data?.total || 0,
  }
}
