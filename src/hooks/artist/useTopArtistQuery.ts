import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Artist } from '@/types/music'

interface TopArtistsApiResponse {
  artists: Artist[]
  code: number
  more: boolean
}

// 热门歌手
export const useTopArtistQuery = (offset: number = 0, limit: number = 5) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['topArtists', offset, limit],
    queryFn: async () => {
      const { data } = await axios.get<TopArtistsApiResponse>('/top/artists', {
        params: {
          offset,
          limit,
        },
      })
      return data.artists || []
    },
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
