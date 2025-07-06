import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface ToplistsResponse {
  list: PlaylistDetail[]
  code: number
}

export const useToplistsQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['toplists'],
    queryFn: async () => {
      const { data } = await axios.get<ToplistsResponse>('/toplist')
      return data.list
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
