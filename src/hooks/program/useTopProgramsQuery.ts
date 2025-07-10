import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Program } from '@/types/program'

interface TopProgramApiResponse {
  toplist: {
    program: Program
    rank: number
    lastRank: number
    score: number
  }[]
  code: number
  updateTime: number
}

export const useTopProgramsQuery = (limit: number = 100) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['topPrograms', limit],
    queryFn: async () => {
      const { data } = await axios.get<TopProgramApiResponse>(
        '/dj/program/toplist',
        {
          params: { limit },
        }
      )

      return data
    },
  })

  return {
    ...queryResult,
    data: queryResult.data?.toplist || [],
    updateTime: queryResult.data?.updateTime || 0,
  }
}
