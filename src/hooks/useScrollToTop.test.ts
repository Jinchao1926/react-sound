import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useQueryParamId } from '@/hooks/useQueryParamId'

import { useScrollToTop } from './useScrollToTop'

// Mock useQueryParamId
vi.mock('@/hooks/useQueryParamId', () => ({
  useQueryParamId: vi.fn(),
}))

describe('useScrollToTop', () => {
  // Mock window.scrollTo
  const scrollToMock = vi.fn()
  const mockUseQueryParamId = useQueryParamId as ReturnType<typeof vi.fn>

  beforeEach(() => {
    window.scrollTo = scrollToMock
    scrollToMock.mockClear()
    mockUseQueryParamId.mockClear()
  })

  it('should scroll to top on mount', () => {
    mockUseQueryParamId.mockReturnValue({ id: 1 })
    renderHook(() => useScrollToTop())

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  })

  it('should scroll to top when query parameter id changes', () => {
    const { rerender } = renderHook(() => useScrollToTop(), {
      initialProps: {},
    })

    mockUseQueryParamId.mockReturnValue({ id: 1 })
    rerender({})
    expect(scrollToMock).toHaveBeenCalledTimes(1)

    // ID changes
    mockUseQueryParamId.mockReturnValue({ id: 2 })
    rerender({})
    expect(scrollToMock).toHaveBeenCalledTimes(2)
  })

  it('should not scroll if id does not change', () => {
    mockUseQueryParamId.mockReturnValue({ id: 1 })
    const { rerender } = renderHook(() => useScrollToTop())

    expect(scrollToMock).toHaveBeenCalledTimes(1)

    // Re-render without changing id
    rerender({})

    // Should still be called only once since id didn't change
    expect(scrollToMock).toHaveBeenCalledTimes(1)
  })

  it('should use auto scroll behavior', () => {
    mockUseQueryParamId.mockReturnValue({ id: 1 })
    renderHook(() => useScrollToTop())

    const calls = scrollToMock.mock.calls
    expect(calls[0][0].behavior).toBe('auto')
  })

  it('should handle undefined id', () => {
    mockUseQueryParamId.mockReturnValue({ id: undefined })
    renderHook(() => useScrollToTop())

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  })
})
