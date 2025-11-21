import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { AlbumDynamic } from '@/types/music'

interface AlbumDynamicApiResponse extends AlbumDynamic {
  code: number
}

/**
 * 专辑动态信息
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 * 必选参数 :** `id`: 专辑 id
 */

export const useAlbumDynamicQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['albumDynamic', id],
    queryFn: async () => {
      const { data } = await axios.get<AlbumDynamicApiResponse>(
        '/album/detail/dynamic',
        {
          params: {
            id,
          },
        }
      )
      return data
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
