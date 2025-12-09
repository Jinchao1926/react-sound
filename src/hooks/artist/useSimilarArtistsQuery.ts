import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Artist } from '@/types/music'
import { Track } from '@/types/track'

interface SimilarArtistsApiResponse {
  artist: Artist
  hotSongs: Track[]
  more: boolean
  code: number
}

/**
 * 获取相似歌手
 * 说明: 调用此接口, 传入歌手 id, 可获得相似歌手，需要登录
 * 必选参数: `id`: 歌手 id
 */
export const useSimilarArtistsQuery = (id: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['similarArtists', id],
    queryFn: async () => {
      const { data } = await axios.get<SimilarArtistsApiResponse>(
        '/simi/artist',
        {
          params: { id },
        }
      )
      return data
    },
    retry: false,
  })

  return {
    ...queryResult,
    artist: queryResult.data?.artist,
    hotSongs: queryResult.data?.hotSongs || [],
    more: queryResult.data?.more || false,
  }
}
