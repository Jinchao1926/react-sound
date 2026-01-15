import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Program } from '@/types/program'

interface ProgramDetailApiResponse {
  program: Program
  code: number
}

/**
 * 电台 - 节目详情
 * 说明 : 调用此接口传入电台节目 id,可获得电台节目详情
 * 必选参数 : `id`: 电台节目 的 id
 */
export const useProgramDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['programDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<ProgramDetailApiResponse>(
        '/dj/program/detail',
        {
          params: {
            id,
          },
        }
      )

      const coverUrl = data.program.coverUrl
      const program: Program = {
        ...data.program,
        mainSong: {
          ...data.program.mainSong,
          album: {
            ...data.program.mainSong.album,
            picUrl: coverUrl,
          },
        },
      }
      return program
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}
