import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Album } from '@/types/album'
import { type Track } from '@/types/track'

interface AlbumDetailApiResponse {
  album: Album
  songs: Track[]
  code: number
}

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 */
export const useAlbumDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['albumDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<AlbumDetailApiResponse>('/album', {
        params: {
          id,
        },
      })
      const tracks: Track[] = data.songs.map((song) => ({
        ...song,
        al: data.album,
      }))
      return { album: data.album, songs: tracks }
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
