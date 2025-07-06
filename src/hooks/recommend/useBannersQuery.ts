import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Banner } from '@/types/banner'

interface BannersApiResponse {
  banners: Banner[]
  code: number
}

export const useBannersQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await axios.get<BannersApiResponse>('/banner')
      return data.banners || []
    },
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
