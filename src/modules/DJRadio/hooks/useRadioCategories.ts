import { useMemo } from 'react'

import { useRadioCategoriesQuery } from '@/hooks/djradio/useRadioCategoriesQuery'

const PAGE_SIZE = 18

export const useRadioCategories = () => {
  const { data: categories } = useRadioCategoriesQuery()

  const paginatedCategories = useMemo(() => {
    if (categories.length === 0) return []

    const totalPages = Math.ceil(categories.length / PAGE_SIZE) || 1

    return Array.from({ length: totalPages }, (_, pageIndex) => {
      const start = pageIndex * PAGE_SIZE
      const end = start + PAGE_SIZE
      return categories.slice(start, end)
    })
  }, [categories])

  return {
    paginatedCategories,
  }
}
