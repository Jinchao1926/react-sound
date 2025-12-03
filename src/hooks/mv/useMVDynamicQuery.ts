import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'

interface MVDynamicApiResponse {
  liked: boolean
  likedCount: number
  shareCount: number
  commentCount: number
  code: number
}

/**
 * 获取 mv 点赞转发评论数数据
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ), 可获取对应 MV 点赞转发评论数数据
 * 必选参数 : `mvid`: mv 的 id
 */
export const useMVDynamicQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['mvDynamic', id],
    queryFn: async () => {
      const { data } = await axios.get<MVDynamicApiResponse>(
        '/mv/detail/info',
        {
          params: {
            mvid: id,
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
