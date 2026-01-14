import { describe, it, expect, vi } from 'vitest'

import { parserLyric } from './lyricsParser'

describe('lyricsParser', () => {
  describe('parserLyric', () => {
    it('should return empty array for undefined input', () => {
      expect(parserLyric(undefined)).toEqual([])
    })

    it('should return empty array for empty string', () => {
      expect(parserLyric('')).toEqual([])
    })

    it('should parse basic lyric line with 2-digit milliseconds', () => {
      const lyric = '[00:10.74]我的小时候吵闹任性的时候'
      const result = parserLyric(lyric)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        time: 10740, // 10 seconds + 74 * 10 milliseconds
        text: '我的小时候吵闹任性的时候',
      })
    })

    it('should parse lyric line with 3-digit milliseconds', () => {
      const lyric = '[00:10.740]我的小时候吵闹任性的时候'
      const result = parserLyric(lyric)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        time: 10740,
        text: '我的小时候吵闹任性的时候',
      })
    })

    it('should parse multiple lyric lines', () => {
      const lyric = `[00:10.74]我的小时候吵闹任性的时候
[00:15.72]我的外婆总会唱歌哄我
[00:21.00]夏天的午后老老的歌安慰我`

      const result = parserLyric(lyric)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        time: 10740,
        text: '我的小时候吵闹任性的时候',
      })
      expect(result[1]).toEqual({
        time: 15720,
        text: '我的外婆总会唱歌哄我',
      })
      expect(result[2]).toEqual({
        time: 21000,
        text: '夏天的午后老老的歌安慰我',
      })
    })

    it('should skip empty lines', () => {
      const lyric = `[00:10.74]我的小时候吵闹任性的时候

[00:15.72]我的外婆总会唱歌哄我`

      const result = parserLyric(lyric)

      expect(result).toHaveLength(2)
    })

    it('should skip lines without proper time format', () => {
      const lyric = `[00:10.74]我的小时候吵闹任性的时候
作词 : 廖莹如/吴依铮
[00:15.72]我的外婆总会唱歌哄我`

      const result = parserLyric(lyric)

      expect(result).toHaveLength(2)
      expect(result[0].text).toBe('我的小时候吵闹任性的时候')
      expect(result[1].text).toBe('我的外婆总会唱歌哄我')
    })

    it('should parse metadata lines with proper format', () => {
      const lyric = `[00:00.00] 作词 : 廖莹如/吴依铮
[00:00.48] 作曲 : 李偲菘
[00:10.74]我的小时候吵闹任性的时候`

      const result = parserLyric(lyric)

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({
        time: 0,
        text: '作词 : 廖莹如/吴依铮',
      })
      expect(result[1]).toEqual({
        time: 480,
        text: '作曲 : 李偲菘',
      })
    })

    it('should handle empty text after timestamp', () => {
      const lyric = '[00:10.74]'

      const result = parserLyric(lyric)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        time: 10740,
        text: '',
      })
    })

    it('should calculate time correctly for minutes and seconds', () => {
      const lyric = '[02:30.50]测试歌词'

      const result = parserLyric(lyric)

      expect(result[0].time).toBe(150500) // 2*60*1000 + 30*1000 + 50*10
    })

    it('should handle whitespace in text', () => {
      const lyric = '[00:10.74]  我的小时候吵闹任性的时候  '

      const result = parserLyric(lyric)

      expect(result[0].text).toBe('我的小时候吵闹任性的时候  ')
    })

    it('should handle special characters in text', () => {
      const lyric = '[00:10.74]Hello (你好) [World]'

      const result = parserLyric(lyric)

      expect(result[0].text).toBe('Hello (你好) [World]')
    })

    it('should handle error during parsing gracefully', () => {
      // Spy on console.error to suppress error output during test
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      const lyric = '[00:10.74]测试歌词'

      // Mock Array.prototype.push to throw an error to trigger catch block
      const originalPush = Array.prototype.push
      let callCount = 0
      Array.prototype.push = function (...args: any[]) {
        callCount++
        // Throw error on first call to trigger catch block
        if (callCount === 1) {
          throw new Error('Simulated parsing error')
        }
        return originalPush.apply(this, args)
      }

      // Call should not throw (error is caught internally)
      const result = parserLyric(lyric)

      // Restore original push
      Array.prototype.push = originalPush

      // Result should be empty since push threw an error
      expect(result).toEqual([])

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalled()

      vi.restoreAllMocks()
    })
  })
})
