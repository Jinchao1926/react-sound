import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Album } from '@/types/music'

interface NewAlbumsApiResponse {
  albums: Album[]
  code: number
}

/**
 * 最新专辑
 * 说明 : 调用此接口 ，获取云音乐首页新碟上架数据
 */
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
