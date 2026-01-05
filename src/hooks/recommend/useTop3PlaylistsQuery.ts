import { type PlaylistDetail } from '@/types/playlist'

import { usePlaylistDetailQuery } from '../playlist/usePlaylistDetailQuery'

/**
 * 榜单类型枚举
 * - SOARING: 飙升榜 (19723756)
 * - NEW_SONG: 新歌榜 (3779629)
 * - ORIGINAL: 原创榜 (2884035)
 */
const Top3PlaylistType = {
  SOARING: 19723756, // 飙升榜
  NEW_SONG: 3779629, // 新歌榜
  ORIGINAL: 2884035, // 原创榜
} as const

// 榜单
export const useTop3PlaylistsQuery = () => {
  // Create individual query hooks for each playlist ID
  const soaringQuery = usePlaylistDetailQuery(Top3PlaylistType.SOARING)
  const newSongQuery = usePlaylistDetailQuery(Top3PlaylistType.NEW_SONG)
  const originalQuery = usePlaylistDetailQuery(Top3PlaylistType.ORIGINAL)
  const queryResults = [soaringQuery, newSongQuery, originalQuery]

  // Check if all queries are successful
  const isLoading = queryResults.some((result) => result.isLoading)
  const isError = queryResults.some((result) => result.isError)
  const error = queryResults.find((result) => result.isError)?.error

  // Extract playlists from query results
  const topPlaylists = queryResults
    .map((result) => result.data)
    .filter(Boolean) as PlaylistDetail[]

  return {
    data: topPlaylists,
    isLoading,
    isError,
    error,
  }
}
