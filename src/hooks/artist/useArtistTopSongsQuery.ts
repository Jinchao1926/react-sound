import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Track } from '@/types/track'

interface ArtistsApiResponse {
  songs: Track[]
  code: number
}

/**
 * 获取歌手单曲
 * 说明: 调用此接口, 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * 必选参数: `id`: 歌手 id, 可由搜索接口获得
 */
export const useArtistTopSongsQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistTopSongs', id],
    queryFn: async () => {
      const { data } = await axios.get<ArtistsApiResponse>('/artist/top/song', {
        params: { id },
      })
      return data
    },
    enabled: !!id,
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data?.songs || [],
  }
}
