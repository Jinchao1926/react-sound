import { type LyricLine } from '@/types/lyric'

/**
 * 使用二分查找找到指定时间对应的歌词行索引
 * @param lyrics - 歌词数组（按时间升序排列）
 * @param targetTime - 目标时间（毫秒）
 * @returns 歌词行索引，如果没有找到返回 -1
 */
export function findLyricIndexByTime(
  lyrics: LyricLine[],
  targetTime: number
): number {
  if (!lyrics || lyrics.length === 0) {
    return -1
  }

  let left = 0
  let right = lyrics.length - 1
  let result = -1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (lyrics[mid].time <= targetTime) {
      result = mid
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return result
}
