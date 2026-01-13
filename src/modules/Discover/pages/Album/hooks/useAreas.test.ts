import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { areas } from '@/constants/area'

import { useAreas } from './useAreas'

describe('useAreas', () => {
  it('should return areas constant', () => {
    const { result } = renderHook(() => useAreas())

    expect(result.current.areas).toBe(areas)
    expect(result.current.areas).toHaveLength(5)
  })

  it('should return areaTags with correct structure', () => {
    const { result } = renderHook(() => useAreas())

    expect(result.current.areaTags).toHaveLength(5)
    expect(result.current.areaTags[0]).toEqual({
      name: '全部',
      href: '/discover/album?area=ALL',
    })
  })

  it('should generate correct href for each area', () => {
    const { result } = renderHook(() => useAreas())

    const expectedTags = [
      { name: '全部', href: '/discover/album?area=ALL' },
      { name: '华语', href: '/discover/album?area=ZH' },
      { name: '欧美', href: '/discover/album?area=EA' },
      { name: '韩国', href: '/discover/album?area=KR' },
      { name: '日本', href: '/discover/album?area=JP' },
    ]

    expect(result.current.areaTags).toEqual(expectedTags)
  })

  it('should memoize areaTags', () => {
    const { result, rerender } = renderHook(() => useAreas())

    const firstRenderTags = result.current.areaTags

    rerender()

    const secondRenderTags = result.current.areaTags

    // Should be the same reference (memoized)
    expect(firstRenderTags).toBe(secondRenderTags)
  })

  it('should map all area codes correctly', () => {
    const { result } = renderHook(() => useAreas())

    const areaCodes = result.current.areaTags.map(
      (tag) => tag.href.split('area=')[1]
    )

    expect(areaCodes).toEqual(['ALL', 'ZH', 'EA', 'KR', 'JP'])
  })

  it('should map all area names correctly', () => {
    const { result } = renderHook(() => useAreas())

    const areaNames = result.current.areaTags.map((tag) => tag.name)

    expect(areaNames).toEqual(['全部', '华语', '欧美', '韩国', '日本'])
  })
})
