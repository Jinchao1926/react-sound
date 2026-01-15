import { useMemo } from 'react'

import { useQueries, useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Program } from '@/types/program'
import { normalizeProgramTrack } from '@/utils/track/normalizeProgramTrack'

interface RadioProgramsApiResponse {
  programs: Program[]
  count: number
  more: boolean
  code: number
}

const PAGE_SIZE = 100

/**
 * 电台 - 节目
 * 说明 : 传入`rid`, 可查看对应电台的电台节
 * 必选参数 : `rid`: 电台 的 id
 * 可选参数 :
 *  `limit` : 返回数量 , 默认为 100
 *  `offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*100, 其中 100 为 limit 的值 , 默认为 0
 *  `asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新
 */
export const useRadioProgramsQuery = (options: {
  radioId?: number
  offset?: number
  limit?: number
  asc?: boolean
}) => {
  const { radioId, offset = 0, limit = PAGE_SIZE, asc = false } = options
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
    enabled: !!radioId,
  })
  return {
    ...queryResult,
    data: (queryResult.data?.programs || []).map(normalizeProgramTrack),
    count: queryResult.data?.count || 0,
    more: queryResult.data?.more || false,
  }
}

/**
 * 说明 : 自动分页获取所有电台节目
 * 必选参数 : `radioId`: 电台 的 id
 * 可选参数 :
 *  `limit` : 每页数量 , 默认为 100
 *  `asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新
 */
export const useRadioProgramsFetchAll = (options: {
  radioId?: number
  limit?: number
  asc?: boolean
}) => {
  const { radioId, limit = PAGE_SIZE, asc = false } = options
  const axios = useAxios()

  // Step 1: Query first page to get total count
  const firstPageQuery = useQuery({
    queryKey: ['radioPrograms', { radioId, offset: 0, limit, asc }],
    queryFn: async () => {
      const { data } = await axios.get<RadioProgramsApiResponse>(
        '/dj/program',
        {
          params: {
            rid: radioId,
            offset: 0,
            limit,
            asc,
          },
        }
      )
      return data
    },
    enabled: !!radioId,
  })

  // Step 2: Calculate total pages based on count
  const totalPages = useMemo(() => {
    if (!firstPageQuery.data?.count) return 1
    return Math.ceil(firstPageQuery.data.count / limit)
  }, [firstPageQuery.data?.count, limit])

  // Step 3: Fetch remaining pages only (skip first page since we already have it)
  const remainingPagesQueries = useQueries({
    queries:
      firstPageQuery.isSuccess && totalPages > 1
        ? Array.from({ length: totalPages - 1 }, (_, idx) => ({
            queryKey: [
              'radioPrograms',
              { radioId, offset: (idx + 1) * limit, limit, asc },
            ],
            queryFn: async () => {
              const { data } = await axios.get<RadioProgramsApiResponse>(
                '/dj/program',
                {
                  params: {
                    rid: radioId,
                    offset: (idx + 1) * limit,
                    limit,
                    asc,
                  },
                }
              )
              return data
            },
            enabled: !!radioId && firstPageQuery.isSuccess,
          }))
        : [],
  })

  // Step 4: Merge first page with remaining pages
  const mergedData = useMemo(() => {
    if (!firstPageQuery.data) return null

    // Start with first page programs
    const allPrograms: Program[] = [...firstPageQuery.data.programs]

    // Add remaining pages
    remainingPagesQueries.forEach((query) => {
      if (query.data?.programs) {
        allPrograms.push(...query.data.programs)
      }
    })

    return {
      programs: allPrograms.map(normalizeProgramTrack),
      count: firstPageQuery.data.count,
      more: false,
      code: firstPageQuery.data.code,
    }
  }, [firstPageQuery.data, remainingPagesQueries])

  const isLoading =
    firstPageQuery.isLoading || remainingPagesQueries.some((q) => q.isLoading)
  const error =
    firstPageQuery.error || remainingPagesQueries.find((q) => q.error)?.error

  return {
    data: mergedData?.programs || [],
    count: mergedData?.count || 0,
    more: mergedData?.more || false,
    isLoading,
    error: error || null,
    isFetching:
      firstPageQuery.isFetching ||
      remainingPagesQueries.some((q) => q.isFetching),
    isSuccess:
      firstPageQuery.isSuccess &&
      (remainingPagesQueries.length === 0 ||
        remainingPagesQueries.every((q) => q.isSuccess)),
  }
}
