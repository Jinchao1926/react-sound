import { describe, it, expect } from 'vitest'

import {
  padLeft,
  formatTime,
  formatYearMonthDay,
  formatMonthDay,
  formatMinuteSecond,
} from './timeFormat'

describe('timeFormat utils', () => {
  describe('padLeft', () => {
    it('should add leading zero for single digit numbers', () => {
      expect(padLeft(5)).toBe('05')
      expect(padLeft(0)).toBe('00')
      expect(padLeft(9)).toBe('09')
    })

    it('should not add leading zero for double digit numbers', () => {
      expect(padLeft(10)).toBe('10')
      expect(padLeft(59)).toBe('59')
      expect(padLeft(99)).toBe('99')
    })
  })

  describe('formatTime', () => {
    it('should format milliseconds to MM:SS', () => {
      expect(formatTime(0)).toBe('00:00')
      expect(formatTime(1000)).toBe('00:01')
      expect(formatTime(60000)).toBe('01:00')
      expect(formatTime(125000)).toBe('02:05')
    })

    it('should handle large values', () => {
      expect(formatTime(3661000)).toBe('61:01') // 61 minutes 1 second
      expect(formatTime(600000)).toBe('10:00')
    })

    it('should round down seconds', () => {
      expect(formatTime(1500)).toBe('00:01') // 1.5 seconds -> 1 second
      expect(formatTime(59999)).toBe('00:59') // 59.999 seconds -> 59 seconds
    })
  })

  describe('formatYearMonthDay', () => {
    it('should format timestamp to YYYY-M-D by default (dash)', () => {
      const timestamp = new Date('2024-03-15').getTime()
      expect(formatYearMonthDay(timestamp)).toBe('2024-3-15')
    })

    it('should format timestamp to YYYY.M.D when format is dot', () => {
      const timestamp = new Date('2024-03-15').getTime()
      expect(formatYearMonthDay(timestamp, 'dot')).toBe('2024.3.15')
    })

    it('should handle single digit months and days', () => {
      const timestamp = new Date('2024-01-05').getTime()
      expect(formatYearMonthDay(timestamp)).toBe('2024-1-5')
      expect(formatYearMonthDay(timestamp, 'dot')).toBe('2024.1.5')
    })
  })

  describe('formatMonthDay', () => {
    it('should format timestamp to MM月DD日', () => {
      const timestamp = new Date('2024-03-15').getTime()
      expect(formatMonthDay(timestamp)).toBe('03月15日')
    })

    it('should pad single digit months and days', () => {
      const timestamp = new Date('2024-01-05').getTime()
      expect(formatMonthDay(timestamp)).toBe('01月05日')
    })
  })

  describe('formatMinuteSecond', () => {
    it('should format to MM:SS by default', () => {
      expect(formatMinuteSecond(0)).toBe('00:00')
      expect(formatMinuteSecond(1000)).toBe('00:01')
      expect(formatMinuteSecond(60000)).toBe('01:00')
      expect(formatMinuteSecond(125000)).toBe('02:05')
    })

    it('should format to MM分SS秒 when format is chinese', () => {
      expect(formatMinuteSecond(0, 'chinese')).toBe('00分00秒')
      expect(formatMinuteSecond(125000, 'chinese')).toBe('02分05秒')
    })

    it('should handle edge cases', () => {
      expect(formatMinuteSecond(59999)).toBe('00:59')
      expect(formatMinuteSecond(3661000)).toBe('61:01')
    })
  })
})
