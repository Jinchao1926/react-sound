import { useMemo } from 'react'

import { usePodcastCategoriesQuery } from '@/hooks/djradio/usePodcastCategoriesQuery'

const PAGE_SIZE = 18

export const usePodcastCategories = () => {
  const { data: categories } = usePodcastCategoriesQuery()

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
