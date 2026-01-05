import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type PopularPlaylist } from '@/types/playlist'

interface PopularPlaylistsApiResponse {
  result: PopularPlaylist[]
  code: number
}

// 推荐歌单
export const usePopularPlaylistsQuery = (limit: number = 8) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['popularPlaylists', limit],
    queryFn: async () => {
      const { data } = await axios.get<PopularPlaylistsApiResponse>(
        '/personalized',
        {
          params: {
            limit,
          },
        }
      )
      return data.result || []
    },
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
