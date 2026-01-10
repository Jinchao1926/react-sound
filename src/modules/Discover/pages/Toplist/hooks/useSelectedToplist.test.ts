import { renderHook, waitFor } from '@testing-library/react'
import * as ReactRouterDom from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import type { TopPlaylist } from '@/types/playlist'

import { useSelectedToplist } from './useSelectedToplist'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

// Mock useToplistsQuery
vi.mock('@/hooks/recommend/useToplistsQuery', () => ({
  useToplistsQuery: vi.fn(),
}))

const mockUseLocation = vi.mocked(ReactRouterDom.useLocation)

// Import after mock
const { useToplistsQuery } = await import('@/hooks/recommend/useToplistsQuery')
const mockUseToplistsQuery = vi.mocked(useToplistsQuery)

describe('useSelectedToplist', () => {
  const mockToplists: TopPlaylist[] = [
    {
      id: 1,
      name: '飙升榜',
      coverImgUrl: 'https://example.com/1.jpg',
      updateFrequency: '每天更新',
      updateTime: 1640000000000,
    },
    {
      id: 2,
      name: '新歌榜',
      coverImgUrl: 'https://example.com/2.jpg',
      updateFrequency: '每天更新',
      updateTime: 1640000000000,
    },
    {
      id: 3,
      name: '热歌榜',
      coverImgUrl: 'https://example.com/3.jpg',
      updateFrequency: '每天更新',
      updateTime: 1640000000000,
    },
  ]

  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    mockUseToplistsQuery.mockReturnValue({
      data: mockToplists,
      isLoading: false,
      isError: false,
      error: null,
    } as any)
  })

  it('should select first toplist when no id param exists', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist).toEqual(mockToplists[0])
      expect(result.current.selectedToplist?.name).toBe('飙升榜')
    })
  })

  it('should select toplist by id from query params', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '?id=2',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist).toEqual(mockToplists[1])
      expect(result.current.selectedToplist?.name).toBe('新歌榜')
    })
  })

  it('should return all toplists', () => {
    const { result } = renderHook(() => useSelectedToplist())

    expect(result.current.toplists).toEqual(mockToplists)
    expect(result.current.toplists).toHaveLength(3)
  })

  it('should handle empty toplists array', async () => {
    mockUseToplistsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    const { result } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist).toBeUndefined()
      expect(result.current.toplists).toEqual([])
    })
  })

  it('should handle non-existent id', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '?id=999',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist).toBeUndefined()
    })
  })

  it('should update when id param changes', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '?id=1',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist?.id).toBe(1)
    })

    // Change id
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '?id=3',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    await waitFor(() => {
      expect(result.current.selectedToplist?.id).toBe(3)
      expect(result.current.selectedToplist?.name).toBe('热歌榜')
    })
  })

  it('should select first toplist when id param is removed', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '?id=2',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist?.id).toBe(2)
    })

    // Remove id param
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    await waitFor(() => {
      expect(result.current.selectedToplist?.id).toBe(1)
      expect(result.current.selectedToplist?.name).toBe('飙升榜')
    })
  })

  it('should update when toplists data changes', async () => {
    const { result, rerender } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      expect(result.current.selectedToplist?.id).toBe(1)
    })

    // Update toplists data
    const newToplists: TopPlaylist[] = [
      {
        id: 10,
        name: '新榜单',
        coverImgUrl: 'https://example.com/10.jpg',
        updateFrequency: '每周更新',
        updateTime: 1650000000000,
      },
    ]

    mockUseToplistsQuery.mockReturnValue({
      data: newToplists,
      isLoading: false,
      isError: false,
      error: null,
    } as any)

    rerender()

    await waitFor(() => {
      expect(result.current.selectedToplist?.id).toBe(10)
      expect(result.current.selectedToplist?.name).toBe('新榜单')
      expect(result.current.toplists).toEqual(newToplists)
    })
  })

  it('should handle string id in query param', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/toplist',
      search: '?id=2',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedToplist())

    await waitFor(() => {
      // Should convert string "2" to number 2
      expect(result.current.selectedToplist?.id).toBe(2)
    })
  })
})
