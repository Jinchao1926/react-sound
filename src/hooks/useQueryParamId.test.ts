import { renderHook } from '@testing-library/react'
import * as ReactRouterDom from 'react-router'
import { describe, it, expect, vi } from 'vitest'

import { useQueryParamId } from './useQueryParamId'

// Mock react-router
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

describe('useQueryParamId', () => {
  const mockUseLocation = vi.mocked(ReactRouterDom.useLocation)

  it('should return id as number when id query param exists', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBe(123)
    expect(typeof result.current.id).toBe('number')
  })

  it('should return undefined when id query param does not exist', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBeUndefined()
  })

  it('should return undefined when search params are empty', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBeUndefined()
  })

  it('should parse id from multiple query params', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?name=test&id=456&sort=asc',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBe(456)
  })

  it('should handle id with value 0', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=0',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBe(0)
  })

  it('should handle negative id values', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=-123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBe(-123)
  })

  it('should convert string id to number', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=999',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBe(999)
    expect(typeof result.current.id).toBe('number')
  })

  it('should handle invalid id values gracefully', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=abc',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    // Number('abc') returns NaN
    expect(result.current.id).toBeNaN()
  })

  it('should use first id if multiple id params exist', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=100&id=200',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useQueryParamId())

    // URLSearchParams.get() returns the first value
    expect(result.current.id).toBe(100)
  })

  it('should update when location search changes', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=123',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useQueryParamId())

    expect(result.current.id).toBe(123)

    // Update location
    mockUseLocation.mockReturnValue({
      pathname: '/song',
      search: '?id=456',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    expect(result.current.id).toBe(456)
  })
})
