import { type FC, useMemo } from 'react'

import {
  Ellipsis,
  NextButton,
  PageButton,
  PaginationWrapper,
  PrevButton,
} from './Pagination.styles'

interface PaginationProps {
  current: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

/**
 * Generate page numbers array with ellipsis
 * Shows maximum 7 pages in the middle, with ellipsis on sides
 * Examples:
 * - Total <= 9: show all pages
 * - Near start: 1 2 3 4 5 6 7 ... 50
 * - In middle: 1 ... 20 21 22 23 24 25 26 ... 50
 * - Near end: 1 ... 44 45 46 47 48 49 50
 */
const generatePages = (
  current: number,
  totalPages: number
): (number | null)[] => {
  // If total pages <= 9, show all
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | null)[] = []
  const maxMiddlePages = 7

  // If current page is near the start (within first 5 pages)
  if (current <= 5) {
    for (let i = 1; i <= maxMiddlePages; i++) {
      pages.push(i)
    }
    pages.push(null) // ellipsis
    pages.push(totalPages)
  }
  // If current page is near the end (within last 5 pages)
  else if (current >= totalPages - 4) {
    pages.push(1)
    pages.push(null) // ellipsis
    for (let i = totalPages - maxMiddlePages + 1; i <= totalPages; i++) {
      pages.push(i)
    }
  }
  // Current page is in the middle
  else {
    pages.push(1)
    pages.push(null) // left ellipsis

    // Show 7 pages centered around current
    const halfRange = Math.floor(maxMiddlePages / 2) // 3
    for (let i = current - halfRange; i <= current + halfRange; i++) {
      pages.push(i)
    }

    pages.push(null) // right ellipsis
    pages.push(totalPages)
  }

  return pages
}

export const Pagination: FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize)

  const pages = useMemo(
    () => generatePages(current, totalPages),
    [current, totalPages]
  )

  const handlePrev = () => {
    if (current > 1) {
      onPageChange(current - 1)
    }
  }

  const handleNext = () => {
    if (current < totalPages) {
      onPageChange(current + 1)
    }
  }

  const handlePageClick = (page: number) => {
    if (page !== current) {
      onPageChange(page)
    }
  }

  return (
    <PaginationWrapper>
      <PrevButton onClick={handlePrev} disabled={current === 1}>
        上一页
      </PrevButton>

      {pages.map((page, index) =>
        page === null ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={page}
            $active={page === current}
            aria-current={page === current ? 'true' : undefined}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageButton>
        )
      )}

      <NextButton onClick={handleNext} disabled={current === totalPages}>
        下一页
      </NextButton>
    </PaginationWrapper>
  )
}
