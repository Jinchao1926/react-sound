import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Album, type Artist } from '@/types/artist'

interface ArtistAlbumsApiResponse {
  artist: Artist
  hotAlbums: Album[]
  code: number
  more: boolean
}

/**
 * 获取歌手专辑
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 *
 * 必选参数 :** `id`: 歌手 id
 * 可选参数 :** `limit`: 取出数量 , 默认为 30
 * offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
 */
export const useArtistAlbumsQuery = (options: {
  id?: number
  offset?: number
  limit?: number
}) => {
  const { id, offset = 0, limit = 5 } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistAlbums', { id, offset, limit }],
    queryFn: async () => {
      const { data } = await axios.get<ArtistAlbumsApiResponse>(
        '/artist/album',
        { params: { id, offset, limit } }
      )
      return data
    },
    enabled: !!id,
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data?.hotAlbums || [],
    more: queryResult.data?.more,
  }
}
