// export function fetchSimilarPlaylists(songId: string) {
//   const id = songId
//   return rsRequest.get({
//     url: '/simi/playlist',
//     params: {
//       id,
//     },
//   })
// }

import { useQuery } from '@tanstack/react-query'

import { useAxios } from '@/providers/AxiosProvider'
import { PlaylistDetail } from '@/types/playlist'

interface SongPlaylistsApiResponse {
  playlists: PlaylistDetail[]
  code: number
}

export const useSongPlaylistsQuery = (id: number) => {
  const axios = useAxios()

  const queryResult = useQuery({
    queryKey: ['songPlaylists', id],
    queryFn: async () => {
      const { data } = await axios.get<SongPlaylistsApiResponse>(
        '/simi/playlist',
        {
          params: {
            id,
          },
        }
      )
      return data.playlists
    },
  })

  return {
    ...queryResult,
    data: queryResult.data || [],
  }
}
