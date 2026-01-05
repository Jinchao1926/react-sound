import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type PlaylistDynamic } from '@/types/playlist'

interface PlaylistDynamicApiResponse extends PlaylistDynamic {
  code: number
}

/**
 * 歌单详情动态
 * 说明 : 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
 * 必选参数 :** `id` : 歌单 id
 */

export const usePlaylistDynamicQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['playlistDynamic', id],
    queryFn: async () => {
      const { data } = await axios.get<PlaylistDynamicApiResponse>(
        '/playlist/detail/dynamic',
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
