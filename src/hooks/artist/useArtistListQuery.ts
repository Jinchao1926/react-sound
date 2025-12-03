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

export type ArtistType = (typeof ArtistTypeEnum)[keyof typeof ArtistTypeEnum]
export type ArtistArea = (typeof ArtistAreaEnum)[keyof typeof ArtistAreaEnum]

interface ArtistListApiResponse {
  artists: Artist[]
  code: number
  more: boolean
}

/**
 * 歌手分类列表
 * 说明 : 调用此接口,可获取歌手分类列表
 * 可选参数 :
 *  `limit` : 返回数量 , 默认为 30
 *  `offset` : 偏移数量，用于分页, 如 :( 页数 -1)\*30, 其中 30 为 limit 的值, 默认为 0
 *  `initial`: 按首字母索引查找参数,如 `/artist/list?type=1&area=96&initial=b` 
 *             返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
 *  `type` 取值:
 *        ```
          -1:全部
          1:男歌手
          2:女歌手
          3:乐队
          ```
 *  `area` 取值:
          ```
          -1:全部
          7华语
          96欧美
          8:日本
          16韩国
          0:其他
          ```
 */
export const useArtistListQuery = (options: {
  type: ArtistType
  area: ArtistArea
  offset?: number
  limit?: number
  initial?: number
}) => {
  const { type, area, offset = 0, limit = 5, initial } = options
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistList', { type, area, offset, limit, initial }],
    queryFn: async () => {
      const { data } = await axios.get<ArtistListApiResponse>('/artist/list', {
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
