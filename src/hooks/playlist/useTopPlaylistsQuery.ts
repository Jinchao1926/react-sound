import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type PlaylistDetail } from '@/types/playlist'

interface TopPlaylistsApiResponse {
  playlists: PlaylistDetail[]
  code: number
  total: number
  more: boolean
  cat: string
}

// 歌单 ( 网友精选碟 )
export const useTopPlaylistsQuery = (options: {
  category: string
  offset?: number
  limit?: number
}) => {
  const { category, offset = 0, limit = 35 } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['topPlaylists', { category, offset, limit }],
    queryFn: async () => {
      const { data } = await axios.get<TopPlaylistsApiResponse>(
        '/top/playlist',
        {
          params: {
            cat: category,
            offset,
            limit,
          },
        }
      )
      return data
    },
  })

  return {
    ...queryResult,
    data: queryResult.data?.playlists || [],
    total: queryResult.data?.total || 0,
    more: queryResult.data?.more || false,
  }
}
