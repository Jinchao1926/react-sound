import { renderHook } from '@testing-library/react'
import * as ReactRouterDom from 'react-router'
import { describe, it, expect, vi } from 'vitest'

import { useUrlParams } from './useUrlParams'

// Mock react-router
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

describe('useUrlParams', () => {
  const mockUseLocation = vi.mocked(ReactRouterDom.useLocation)

  it('should return URLSearchParams instance', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?id=123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current).toBeInstanceOf(URLSearchParams)
  })

  it('should parse single query parameter', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?name=test',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('name')).toBe('test')
  })

  it('should parse multiple query parameters', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?id=123&name=test&sort=asc',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('id')).toBe('123')
    expect(result.current.get('name')).toBe('test')
    expect(result.current.get('sort')).toBe('asc')
  })

  it('should handle empty search string', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('id')).toBeNull()
    expect(result.current.toString()).toBe('')
  })

  it('should handle search string with only question mark', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.toString()).toBe('')
  })

  it('should handle URL encoded parameters', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?name=%E6%B5%8B%E8%AF%95&type=music',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('name')).toBe('测试')
    expect(result.current.get('type')).toBe('music')
  })

  it('should handle parameters with special characters', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?email=test@example.com&url=https://example.com',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('email')).toBe('test@example.com')
    expect(result.current.get('url')).toBe('https://example.com')
  })

  it('should handle parameters with empty values', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?key1=&key2=value',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('key1')).toBe('')
    expect(result.current.get('key2')).toBe('value')
  })

  it('should handle parameters without values', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?flag&id=123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    expect(result.current.get('flag')).toBe('')
    expect(result.current.get('id')).toBe('123')
  })

  it('should handle duplicate parameter names', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?tag=music&tag=rock&tag=pop',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    // get() returns first value
    expect(result.current.get('tag')).toBe('music')

    // getAll() returns all values
    expect(result.current.getAll('tag')).toEqual(['music', 'rock', 'pop'])
  })

  it('should update when location.search changes', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?id=123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useUrlParams())

    expect(result.current.get('id')).toBe('123')

    // Update location.search
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?id=456',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    expect(result.current.get('id')).toBe('456')
  })

  it('should not update when location.pathname changes but search stays same', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?id=123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useUrlParams())

    expect(result.current.get('id')).toBe('123')

    // Update only pathname
    mockUseLocation.mockReturnValue({
      pathname: '/different',
      search: '?id=123',
      hash: '',
      state: null,
      key: 'different',
    })

    rerender()

    // Should still have same result (memoized)
    expect(result.current.get('id')).toBe('123')
  })

  it('should support all URLSearchParams methods', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/test',
      search: '?id=123&name=test',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useUrlParams())

    // has()
    expect(result.current.has('id')).toBe(true)
    expect(result.current.has('notExist')).toBe(false)

    // keys()
    const keys = Array.from(result.current.keys())
    expect(keys).toEqual(['id', 'name'])

    // values()
    const values = Array.from(result.current.values())
    expect(values).toEqual(['123', 'test'])

    // entries()
    const entries = Array.from(result.current.entries())
    expect(entries).toEqual([
      ['id', '123'],
      ['name', 'test'],
    ])
  })
})
