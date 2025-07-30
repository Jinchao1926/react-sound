import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistCategoriesApiResponse } from '@/types/playlist-category'
import { parsePlaylistCategories } from '@/utils/playlistCategoryParser'

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
