/**
 * 歌词解析器
 * 示例歌词格式:
 * [00:00.00] 作词 : 廖莹如/吴依铮
 * [00:00.48] 作曲 : 李偲菘
 * [00:10.74] 我的小时候吵闹任性的时候
 * [00:15.72] 我的外婆总会唱歌哄我
 */

import { type LyricLine } from '@/types/lyric'

// 正则表达式
// \[ 和 \]，表示 [ 和 ] 字符，特殊字符需要转义
// \d，表示数字
// {2}，表示匹配 2 个
const LYRIC_TIME_REGEX = /^\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.*?)$/

/**
 * 解析歌词文本为歌词行数组
 * @param lyricText 原始歌词文本
 * @returns 解析后的歌词行数组，按时间排序
 */
export const parserLyric = (lyricText?: string): LyricLine[] => {
  if (!lyricText) return []

  const lines = lyricText.split('\n')
  const lyricLines: LyricLine[] = []

  lines.forEach((line) => {
    if (!line.trim()) return

    const result = LYRIC_TIME_REGEX.exec(line)
    if (result) {
      // 0: "[00:00.97] 原唱 : 孙燕姿"
      // 1: "00" - 分钟
      // 2: "00" - 秒
      // 3: "97" - 毫秒
      // 4: "原唱 : 孙燕姿" - 文本
      try {
        const minutes = parseInt(result[1], 10) || 0
        const seconds = parseInt(result[2], 10) || 0
        let milliseconds = parseInt(result[3], 10) || 0

        // 兼容2位和3位毫秒格式
        if (result[3].length === 2) {
          milliseconds *= 10
        }

        const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds
        const text = result[4] || ''

        lyricLines.push({ time, text })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('解析歌词行失败:', line, error)
      }
    }
  })

  return lyricLines
}
