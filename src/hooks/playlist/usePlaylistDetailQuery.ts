import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface PlaylistDetailResponse {
  playlist: PlaylistDetail
  code: number
}

export const usePlaylistDetailQuery = (id: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['playlistDetail', { id }],
    queryFn: async () => {
      const { data } = await axios.get<PlaylistDetailResponse>(
        '/playlist/detail',
        {
          params: {
            id,
          },
        }
      )
      return data.playlist
    },
  })

  return queryResult
}
