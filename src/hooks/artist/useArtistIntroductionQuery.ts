import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type ArtistIntroduction } from '@/types/artist'

interface ArtistIntroductionApiResponse extends ArtistIntroduction {
  code: number
}

/**
 * 获取歌手描述
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
 * 必选参数 : `id`: 歌手 id
 */
export const useArtistIntroductionQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistDescription', id],
    queryFn: async () => {
      const { data } = await axios.get<ArtistIntroductionApiResponse>(
        '/artist/desc',
        {
          params: {
            id,
          },
        }
      )
      return data
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
