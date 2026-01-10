import { renderHook } from '@testing-library/react'
import * as ReactRouterDom from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import { useSelectedPlaylistCategory } from './useSelectedPlaylistCategory'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

describe('useSelectedPlaylistCategory', () => {
  const mockUseLocation = vi.mocked(ReactRouterDom.useLocation)

  it('should return default category when no cat param exists', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('全部')
  })

  it('should return category from query params', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=华语',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('华语')
  })

  it('should handle different category values', () => {
    const categories = ['流行', '摇滚', '民谣', '电子', '轻音乐']

    categories.forEach((category) => {
      mockUseLocation.mockReturnValue({
        pathname: '/discover/playlist',
        search: `?cat=${category}`,
        hash: '',
        state: null,
        key: 'default',
      })

      const { result } = renderHook(() => useSelectedPlaylistCategory())

      expect(result.current.selectedCategory).toBe(category)
    })
  })

  it('should return category even with other query params', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?order=hot&cat=欧美&limit=35',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('欧美')
  })

  it('should handle empty cat param and use default', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('全部')
  })

  it('should handle URL encoded category names', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=%E5%8D%8E%E8%AF%AD', // "华语" URL encoded
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('华语')
  })

  it('should update when location search changes', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=流行',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('流行')

    // Update location
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=摇滚',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    expect(result.current.selectedCategory).toBe('摇滚')
  })

  it('should memoize selectedCategory when search params do not change', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=华语',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedPlaylistCategory())

    const firstResult = result.current.selectedCategory

    // Rerender without changing location
    rerender()

    const secondResult = result.current.selectedCategory

    // Values should be equal
    expect(firstResult).toBe(secondResult)
  })

  it('should handle special characters in category names', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=ACG(动漫)',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('ACG(动漫)')
  })

  it('should return to default when cat param is removed', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '?cat=华语',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedPlaylistCategory())

    expect(result.current.selectedCategory).toBe('华语')

    // Remove cat param
    mockUseLocation.mockReturnValue({
      pathname: '/discover/playlist',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    expect(result.current.selectedCategory).toBe('全部')
  })
})
