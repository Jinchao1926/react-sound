import { describe, it, expect } from 'vitest'

import { getDisplayLength, sliceByDisplayLength } from './stringUtils'

describe('stringUtils', () => {
  describe('getDisplayLength', () => {
    it('should count English characters as 1', () => {
      expect(getDisplayLength('hello')).toBe(5)
      expect(getDisplayLength('abc')).toBe(3)
      expect(getDisplayLength('')).toBe(0)
    })

    it('should count Chinese characters as 2', () => {
      expect(getDisplayLength('你好')).toBe(4)
      expect(getDisplayLength('测试')).toBe(4)
      expect(getDisplayLength('一')).toBe(2)
    })

    it('should handle mixed English and Chinese characters', () => {
      expect(getDisplayLength('Hello你好')).toBe(9) // 5 + 4
      expect(getDisplayLength('测试test')).toBe(8) // 4 + 4
      expect(getDisplayLength('a中b文c')).toBe(7) // 1 + 2 + 1 + 2 + 1
    })

    it('should handle special characters', () => {
      expect(getDisplayLength('123')).toBe(3)
      expect(getDisplayLength('!@#')).toBe(3)
      expect(getDisplayLength(' ')).toBe(1)
    })
  })

  describe('sliceByDisplayLength', () => {
    it('should slice English strings correctly', () => {
      expect(sliceByDisplayLength('hello', 3)).toBe('hel')
      expect(sliceByDisplayLength('hello', 5)).toBe('hello')
      expect(sliceByDisplayLength('hello', 10)).toBe('hello')
    })

    it('should slice Chinese strings correctly', () => {
      expect(sliceByDisplayLength('你好世界', 4)).toBe('你好')
      expect(sliceByDisplayLength('测试', 2)).toBe('测')
      expect(sliceByDisplayLength('一二三', 6)).toBe('一二三')
    })

    it('should slice mixed strings correctly', () => {
      expect(sliceByDisplayLength('Hello你好', 7)).toBe('Hello你')
      expect(sliceByDisplayLength('a中b文c', 5)).toBe('a中b')
      expect(sliceByDisplayLength('测试test', 6)).toBe('测试te')
    })

    it('should return full string if maxLength is larger', () => {
      expect(sliceByDisplayLength('abc', 100)).toBe('abc')
      expect(sliceByDisplayLength('你好', 100)).toBe('你好')
    })

    it('should return empty string for empty input', () => {
      expect(sliceByDisplayLength('', 5)).toBe('')
    })

    it('should handle edge case with maxLength = 0', () => {
      expect(sliceByDisplayLength('hello', 0)).toBe('')
      expect(sliceByDisplayLength('你好', 0)).toBe('')
    })
  })
})
