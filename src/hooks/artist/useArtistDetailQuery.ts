import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { type Artist } from '@/types/artist'
import { type User } from '@/types/user'

type ArtistDetailApiArtist = Omit<Artist, 'img1v1Url' | 'picUrl'> & {
  avatar: string
  cover: string
}
interface ArtistDetailApiResponse {
  data: {
    artist: ArtistDetailApiArtist
    user?: User
  }
  code: number
}

/**
 * 获取歌手详情
 * 说明: 调用此接口, 传入歌手 id, 可获得获取歌手详情
 * 必选参数 : `id`: 歌手 id
 */
export const useArtistDetailQuery = (id?: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['artistDetail', id],
    queryFn: async () => {
      const { data } = await axios.get<ArtistDetailApiResponse>(
        '/artist/detail',
        {
          params: {
            id,
          },
        }
      )
      return {
        ...data,
        data: {
          ...data.data,
          artist: normalizeArtistDetail(data.data.artist),
        },
      }
    },
    enabled: !!id,
    staleTime: Infinity,
  })

  return queryResult
}

const normalizeArtistDetail = (artist: ArtistDetailApiArtist): Artist => ({
  ...artist,
  img1v1Url: artist.avatar,
  picUrl: artist.cover,
})
