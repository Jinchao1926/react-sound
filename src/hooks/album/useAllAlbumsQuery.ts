import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Album } from '@/types/music'

interface AllAlbumsApiResponse {
  albums: Album[]
  code: number
  total: number
}

export const useAllAlbumsQuery = (options: {
  area: string
  offset?: number
  limit?: number
}) => {
  const { area, offset = 0, limit = 10 } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['allAlbums', area, offset, limit],
    queryFn: async () => {
      const { data } = await axios.get<AllAlbumsApiResponse>('/album/new', {
        params: { area, offset, limit },
      })
      return data
    },
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data?.albums || [],
    total: queryResult.data?.total || 0,
  }
}
