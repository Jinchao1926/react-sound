import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface PlaylistDetailApiResponse {
  playlist: PlaylistDetail
  code: number
}

export const usePlaylistDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['playlistDetail', { id }],
    queryFn: async () => {
      const { data } = await axios.get<PlaylistDetailApiResponse>(
        '/playlist/detail',
        {
          params: {
            id,
          },
        }
      )
      return data.playlist
    },
    enabled: !!id,
  })

  return queryResult
}
