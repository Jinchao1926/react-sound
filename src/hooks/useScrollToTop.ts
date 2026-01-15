import { useEffect } from 'react'

import { useQueryParamId } from '@/hooks/useQueryParamId'

/**
 * Automatically scrolls to the top of the page when the URL query parameter 'id' changes.
 * Useful for resetting scroll position when the route changes.
 * @example
 * // In a component, simply call the hook:
 * useScrollToTop()
 */
export const useScrollToTop = () => {
  const { id } = useQueryParamId()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [id])
}
