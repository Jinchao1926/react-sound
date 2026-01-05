import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Song } from '@/types/track'

interface SongPlaylistsApiResponse {
  songs: Song[]
  code: number
}

// 获取相似音乐
export const useSimilarSongsQuery = (id: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['similarSongs', id],
    queryFn: async () => {
      const { data } = await axios.get<SongPlaylistsApiResponse>('/simi/song', {
        params: {
          id,
        },
      })
      return data.songs
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
