import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Album } from '@/types/music'

interface NewAlbumsApiResponse {
  albums: Album[]
  code: number
}

export const useNewAlbumsQuery = () => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['newAlbums'],
    queryFn: async () => {
      const { data } = await axios.get<NewAlbumsApiResponse>('/album/newest')
      return data.albums || []
    },
    retry: false,
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
