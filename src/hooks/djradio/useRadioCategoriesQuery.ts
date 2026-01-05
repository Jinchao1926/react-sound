import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type RadioCategory } from '@/types/djradio'

interface RadioCategoriesApiResponse {
  categories: RadioCategory[]
  code: number
}

export const useRadioCategoriesQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['radioCategories'],
    queryFn: async () => {
      const { data } =
        await axios.get<RadioCategoriesApiResponse>('/dj/catelist')

      return data.categories
    },
    staleTime: Infinity,
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
