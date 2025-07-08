import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PodcastCategory } from '@/types/djradio'

interface PodcastCategoriesApiResponse {
  categories: PodcastCategory[]
  code: number
}

export const usePodcastCategoriesQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['podcastCategories'],
    queryFn: async () => {
      const { data } =
        await axios.get<PodcastCategoriesApiResponse>('/dj/catelist')

      return data.categories
    },
    staleTime: Infinity,
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
