import { renderHook } from '@testing-library/react'
import * as ReactRouterDom from 'react-router'
import { describe, it, expect, vi } from 'vitest'

import { DEFAULT_AREA } from '@/constants/area'

import { useSelectedArea } from './useSelectedArea'

// Mock react-router
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

describe('useSelectedArea', () => {
  const mockUseLocation = vi.mocked(ReactRouterDom.useLocation)

  it('should return default area when no area param exists', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedArea())

    expect(result.current.selectedArea).toBe(DEFAULT_AREA)
    expect(result.current.selectedArea).toBe('ALL')
  })

  it('should return area from query params', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?area=ZH',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedArea())

    expect(result.current.selectedArea).toBe('ZH')
  })

  it('should handle different area codes', () => {
    const areaCodes = ['ALL', 'ZH', 'EA', 'KR', 'JP']

    areaCodes.forEach((areaCode) => {
      mockUseLocation.mockReturnValue({
        pathname: '/discover/album',
        search: `?area=${areaCode}`,
        hash: '',
        state: null,
        key: 'default',
      })

      const { result } = renderHook(() => useSelectedArea())

      expect(result.current.selectedArea).toBe(areaCode)
    })
  })

  it('should return area even with other query params', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?page=2&area=EA&sort=hot',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedArea())

    expect(result.current.selectedArea).toBe('EA')
  })

  it('should handle empty area param and use default', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?area=',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedArea())

    expect(result.current.selectedArea).toBe(DEFAULT_AREA)
  })

  it('should update when location search changes', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?area=ZH',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedArea())

    expect(result.current.selectedArea).toBe('ZH')

    // Update location
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?area=JP',
      hash: '',
      state: null,
      key: 'default',
    })

    rerender()

    expect(result.current.selectedArea).toBe('JP')
  })

  it('should return custom/invalid area code without validation', () => {
    // The hook doesn't validate area codes, it just reads from query params
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?area=CUSTOM',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result } = renderHook(() => useSelectedArea())

    expect(result.current.selectedArea).toBe('CUSTOM')
  })

  it('should memoize selectedArea when search params do not change', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/discover/album',
      search: '?area=ZH',
      hash: '',
      state: null,
      key: 'default',
    })

    const { result, rerender } = renderHook(() => useSelectedArea())

    const firstResult = result.current.selectedArea

    // Rerender without changing location
    rerender()

    const secondResult = result.current.selectedArea

    // Values should be equal
    expect(firstResult).toBe(secondResult)
  })
})
