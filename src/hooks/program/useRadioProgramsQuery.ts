import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Program } from '@/types/program'

interface RadioProgramsApiResponse {
  programs: Program[]
  count: number
  more: boolean
  code: number
}

/**
 * 电台 - 节目
 * 说明 : 传入`rid`, 可查看对应电台的电台节
 * 必选参数 : `rid`: 电台 的 id
 * 可选参数 :
 *  `limit` : 返回数量 , 默认为 30
 *  `offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
 *  `asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新
 */
export const useRadioProgramsQuery = (options: {
  radioId: number
  offset?: number
  limit?: number
  asc?: boolean
}) => {
  const { radioId, offset = 0, limit = 100, asc = false } = options
  const axios = useAxios()

  /* 
  const queryClient = useQueryClient()
  const prevAscRef = useRef<boolean>(asc)

  // Cache handling when asc changes 
  useEffect(() => {
    if (prevAscRef.current !== asc) {
      queryClient.removeQueries({
        queryKey: ['radioPrograms', { radioId, asc: prevAscRef.current }],
        exact: false,
      })
      prevAscRef.current = asc
    }
  }, [asc, radioId, queryClient])
  */

  const queryResult = useQuery({
    queryKey: ['radioPrograms', { radioId, offset, limit, asc }],
    queryFn: async () => {
      const { data } = await axios.get<RadioProgramsApiResponse>(
        '/dj/program',
        {
          params: {
            rid: radioId,
            offset,
            limit,
            asc,
          },
        }
      )

      return data
    },
  })
  return {
    ...queryResult,
    data: queryResult.data?.programs || [],
    count: queryResult.data?.count || 0,
    more: queryResult.data?.more || false,
  }
}
