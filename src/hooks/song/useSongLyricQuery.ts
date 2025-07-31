import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Lyric } from '@/types/lyric'
import { parserLyric } from '@/utils/lyricsParser'

interface SongLyricApiResponse {
  lrc: Lyric
  code: number
}

export const useSongLyricQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['songLyric', id],
    queryFn: async () => {
      const { data } = await axios.get<SongLyricApiResponse>('/lyric', {
        params: {
          id,
        },
      })
      return parserLyric(data.lrc.lyric)
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
