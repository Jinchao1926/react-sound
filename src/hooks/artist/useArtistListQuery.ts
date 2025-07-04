import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Artist } from '@/types/music'

export const ArtistTypeEnum = {
  ALL: -1, // 全部
  MALE: 1, // 男歌手
  FEMALE: 2, // 女歌手
  GROUP: 3, // 乐队
} as const

export const ArtistAreaEnum = {
  ALL: -1, // 全部
  CHINESE: 7, // 华语
  WESTERN: 96, // 欧美
  JAPANESE: 8, // 日本
  KOREAN: 16, // 韩国
  OTHER: 0, // 其他
} as const

type ArtistType = (typeof ArtistTypeEnum)[keyof typeof ArtistTypeEnum]
type ArtistArea = (typeof ArtistAreaEnum)[keyof typeof ArtistAreaEnum]

interface ArtistListResponse {
  artists: Artist[]
  code: number
  more: boolean
}

export const useArtistListQuery = (options: {
  type: ArtistType
  area: ArtistArea
  offset?: number
  limit?: number
  initial?: string
}) => {
  const { type, area, offset = 0, limit = 5, initial } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistList', { type, area, offset, limit }],
    queryFn: async () => {
      const { data } = await axios.get<ArtistListResponse>('/artist/list', {
        params: { type, area, offset, limit, initial },
      })
      return data.artists || []
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
