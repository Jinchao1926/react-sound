import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { Program } from '@/types/program'

interface RecommendedProgramApiResponse {
  programs: Program[]
  code: number
}

// 推荐节目
export const useRecommendedProgramsQuery = (limit: number = 50) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['recommendedPrograms', limit],
    queryFn: async () => {
      const { data } = await axios.get<RecommendedProgramApiResponse>(
        '/program/recommend',
        {
          params: { limit },
        }
      )

      return data.programs
    },
  })
  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
