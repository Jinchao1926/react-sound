import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type PlaylistCategoriesApiResponse } from '@/types/playlist-category'
import { parsePlaylistCategories } from '@/utils/playlistCategoriesParser'

/**
 * 歌单分类
 * 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 */
export const usePlaylistCategoriesQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['playlistCategories'],
    queryFn: async () => {
      const { data } =
        await axios.get<PlaylistCategoriesApiResponse>('/playlist/catlist')

      return parsePlaylistCategories(data)
    },
    staleTime: Infinity,
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
