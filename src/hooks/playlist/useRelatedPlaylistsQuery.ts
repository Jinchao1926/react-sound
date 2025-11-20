import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface RelatedPlaylistsApiResponse {
  playlists: PlaylistDetail[]
  code: number
}

/**
 * 相关歌单推荐
 * 说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 [https://music.163.com/#/playlist?id=1](https://music.163.com/#/playlist?id=1))
 */
export const useRelatedPlaylistsQuery = (id: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['relatedPlaylists', id],
    queryFn: async () => {
      const { data } = await axios.get<RelatedPlaylistsApiResponse>(
        '/related/playlist',
        {
          params: {
            id,
          },
        }
      )
      return data.playlists
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
