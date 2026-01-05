import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type PlaylistDetail } from '@/types/playlist'

interface PlaylistDetailApiResponse {
  playlist: PlaylistDetail
  code: number
}

/**
 * 获取歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可以获取对应歌单内的所有的音乐
 * 必选参数 :** `id` : 歌单 id
 * 可选参数 :** `s` : 歌单最近的 s 个收藏者,默认为 8
 */
export const usePlaylistDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['playlistDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<PlaylistDetailApiResponse>(
        '/playlist/detail',
        {
          params: {
            id,
          },
        }
      )
      return data.playlist
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
