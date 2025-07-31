import { useMemo } from 'react'

import { areas } from '@/constants/area'

export interface AreaTag {
  name: string
  href: string
}

export const useAreas = () => {
  const areaTags = useMemo(
    () =>
      areas.map((item) => ({
        name: item.name,
        href: `/discover/album?area=${item.code}`,
      })),
    []
  )

  return {
    areas,
    areaTags,
  }
}
