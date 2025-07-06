import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface TopPlaylistsApiResponse {
  playlist: PlaylistDetail[]
  code: number
  total: number
  more: boolean
  cat: string
}

export const useTopPlaylistsQuery = (options: {
  cat: string
  offset?: number
  limit?: number
}) => {
  const { cat, offset = 0, limit = 35 } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['topPlaylists', { cat, offset, limit }],
    queryFn: async () => {
      const { data } = await axios.get<TopPlaylistsApiResponse>(
        '/top/playlist',
        {
          params: {
            cat,
            offset,
            limit,
          },
        }
      )
      return data.playlist
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
