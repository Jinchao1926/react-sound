import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Album } from '@/types/music'

interface LatestAlbumsResponse {
  albums: Album[]
  code: number
}

export const useLatestAlbumsQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['latestAlbums'],
    queryFn: async () => {
      const { data } = await axios.get<LatestAlbumsResponse>('/album/newest')
      return data.albums || []
    },
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
