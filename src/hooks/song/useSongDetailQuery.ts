import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Track } from '@/types/track'

interface SongDetailApiResponse {
  songs: Track[]
  code: number
}

export const useSongDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['songDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<SongDetailApiResponse>('/song/detail', {
        params: {
          ids: id,
        },
      })
      return data.songs.length > 0 ? data.songs[0] : undefined
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}

export const useSongsDetailQuery = (ids: number[]) => {
  const axios = useAxios()
  const idsString = ids.join(',')

  const queryResult = useQuery({
    queryKey: ['songDetail', ids],
    queryFn: async () => {
      const { data } = await axios.get<SongDetailApiResponse>('/song/detail', {
        params: {
          ids: idsString,
        },
      })
      return data.songs
    },
    enabled: !!ids.length,
  })

  return queryResult
}
