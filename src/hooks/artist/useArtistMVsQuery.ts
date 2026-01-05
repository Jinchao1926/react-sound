import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type MV2 } from '@/types/mv'

interface ArtistMVsApiResponse {
  mvs: MV2[]
  hasMore: boolean
  code: number
}

/**
 * 获取歌手 mv
 * 说明 : 调用此接口, 传入歌手 id, 可获得歌手 mv 信息
 * 必选参数 :** `id`: 歌手 id, 可由搜索接口获得
 */
export const useArtistMVsQuery = (options: {
  id?: number
  offset?: number
  limit?: number
}) => {
  const { id, offset, limit } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistMVs', { id, offset, limit }],
    queryFn: async () => {
      const { data } = await axios.get<ArtistMVsApiResponse>('/artist/mv', {
        params: { id, offset, limit },
      })
      return data
    },
    enabled: !!id,
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data?.mvs || [],
    hasMore: queryResult.data?.hasMore,
  }
}
