import { describe, it, expect } from 'vitest'

import {
  roundToDecimal,
  formatPlayCount,
  formatSizedImage,
  formatImage,
  formatHttpUrlToHttps,
  getTrackUrl,
} from './dataFormat'

describe('dataFormat utils', () => {
  describe('roundToDecimal', () => {
    it('should return original number when decimal is >= 1', () => {
      expect(roundToDecimal(5.7, 1)).toBe(5.7)
      expect(roundToDecimal(5.7, 2)).toBe(5.7)
    })

    it('should return original number when decimal is <= 0', () => {
      expect(roundToDecimal(5.7, 0)).toBe(5.7)
      expect(roundToDecimal(5.7, -1)).toBe(5.7)
    })

    it('should round to specified decimal', () => {
      expect(roundToDecimal(5.7, 0.5)).toBe(5.5)
      expect(roundToDecimal(5.8, 0.5)).toBe(6.0)
      expect(roundToDecimal(3.2, 0.5)).toBe(3.0)
    })
  })

  describe('formatPlayCount', () => {
    it('should return original number for counts less than 100000', () => {
      expect(formatPlayCount(0)).toBe(0)
      expect(formatPlayCount(999)).toBe(999)
      expect(formatPlayCount(99999)).toBe(99999)
    })

    it('should format to 万 for counts >= 100000', () => {
      expect(formatPlayCount(100000)).toBe('10万')
      expect(formatPlayCount(150000)).toBe('15万')
      expect(formatPlayCount(1234567)).toBe('123万')
    })

    it('should floor the result', () => {
      expect(formatPlayCount(199999)).toBe('19万') // floors to 19
    })
  })

  describe('formatSizedImage', () => {
    it('should convert http image URL to https', () => {
      const url = 'http://example.com/image.jpg'
      expect(formatImage(url)).toBe(
        'https://example.com/image.jpg?param=140y140'
      )
    })

    it('should append size parameter with default 140x140', () => {
      const url = 'https://example.com/image.jpg'
      expect(formatSizedImage(url)).toBe(
        'https://example.com/image.jpg?param=140y140'
      )
    })

    it('should use custom size when provided', () => {
      const url = 'https://example.com/image.jpg'
      expect(formatSizedImage(url, 200)).toBe(
        'https://example.com/image.jpg?param=200y200'
      )
    })
  })

  describe('formatImage', () => {
    it('should convert http image URL to https', () => {
      const url = 'http://example.com/image.jpg'
      expect(formatImage(url)).toBe(
        'https://example.com/image.jpg?param=140y140'
      )
    })

    it('should append width and height parameters with defaults', () => {
      const url = 'https://example.com/image.jpg'
      expect(formatImage(url)).toBe(
        'https://example.com/image.jpg?param=140y140'
      )
    })

    it('should use custom width and height', () => {
      const url = 'https://example.com/image.jpg'
      expect(formatImage(url, 300, 200)).toBe(
        'https://example.com/image.jpg?param=300y200'
      )
    })

    it('should handle different width and height', () => {
      const url = 'https://example.com/image.jpg'
      expect(formatImage(url, 100, 50)).toBe(
        'https://example.com/image.jpg?param=100y50'
      )
    })
  })

  describe('formatHttpUrlToHttps', () => {
    it('should convert http URL to https', () => {
      expect(formatHttpUrlToHttps('http://example.com/image.jpg')).toBe(
        'https://example.com/image.jpg'
      )
    })

    it('should keep non-http URLs unchanged', () => {
      expect(formatHttpUrlToHttps('https://example.com/image.jpg')).toBe(
        'https://example.com/image.jpg'
      )
      expect(formatHttpUrlToHttps('//example.com/image.jpg')).toBe(
        '//example.com/image.jpg'
      )
    })
  })

  describe('getTrackUrl', () => {
    it('should generate correct track URL', () => {
      expect(getTrackUrl(12345)).toBe(
        'https://music.163.com/song/media/outer/url?id=12345.mp3'
      )
    })

    it('should handle different IDs', () => {
      expect(getTrackUrl(1)).toBe(
        'https://music.163.com/song/media/outer/url?id=1.mp3'
      )
      expect(getTrackUrl(9999999)).toBe(
        'https://music.163.com/song/media/outer/url?id=9999999.mp3'
      )
    })
  })
})
