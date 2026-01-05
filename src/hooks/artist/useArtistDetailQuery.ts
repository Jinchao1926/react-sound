import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Album } from '@/types/music'
import { type Track } from '@/types/track'

interface ArtistDetailApiResponse {
  album: Album
  songs: Track[]
  code: number
}

/**
 * 获取歌手详情
 * 说明: 调用此接口, 传入歌手 id, 可获得获取歌手详情
 * 必选参数 : `id`: 歌手 id
 */
export const useArtistDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<ArtistDetailApiResponse>(
        '/artist/detail',
        {
          params: {
            id,
          },
        }
      )
      return { album: data.album, songs: data.songs }
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
