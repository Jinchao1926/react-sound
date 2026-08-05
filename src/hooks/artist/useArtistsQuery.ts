import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Artist } from '@/types/artist'
import { type Track } from '@/types/track'

interface ArtistsApiResponse {
  artist: Artist
  hotSongs: Track[]
  more: boolean
  code: number
}

/**
 * 获取歌手单曲
 * 说明: 调用此接口, 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * 必选参数: `id`: 歌手 id, 可由搜索接口获得
 */
const useArtistsQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistSongs', id],
    queryFn: async () => {
      const { data } = await axios.get<ArtistsApiResponse>('/artists', {
        params: { id },
      })
      return data
    },
    enabled: !!id,
    retry: false,
  })

  return {
    ...queryResult,
    artist: queryResult.data?.artist,
    hotSongs: queryResult.data?.hotSongs || [],
    more: queryResult.data?.more || false,
  }
}

export const useArtistQuery = (id?: number) => {
  const { artist } = useArtistsQuery(id)

  return { data: artist }
}

export const useArtistSongsQuery = (id?: number) => {
  const { hotSongs } = useArtistsQuery(id)

  return { data: hotSongs }
}
