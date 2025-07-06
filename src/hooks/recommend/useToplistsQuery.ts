import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { TopPlaylist } from '@/types/playlist'

interface ToplistsApiResponse {
  list: TopPlaylist[]
  code: number
}

export const useToplistsQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['toplists'],
    queryFn: async () => {
      const { data } = await axios.get<ToplistsApiResponse>('/toplist')
      return data.list
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
