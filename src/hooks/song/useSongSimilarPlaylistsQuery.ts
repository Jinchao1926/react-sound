import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface SongSimilarPlaylistsApiResponse {
  playlists: PlaylistDetail[]
  code: number
}

/**
 * 获取相似歌单
 * 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单
 */
export const useSongSimilarPlaylistsQuery = (id: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['songSimilarPlaylists', id],
    queryFn: async () => {
      const { data } = await axios.get<SongSimilarPlaylistsApiResponse>(
        '/simi/playlist',
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
