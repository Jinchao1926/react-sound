import { useEffect, useState } from 'react'

import { useToplistsQuery } from '@/hooks/playlist/useToplistsQuery'
import { useUrlParams } from '@/hooks/useUrlParams'

export const useSelectedToplist = () => {
  const queryParams = useUrlParams()
  const toplistId = queryParams.get('id')
  const { data: toplists } = useToplistsQuery()

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (toplistId) {
      setSelectedId(Number(toplistId))
    } else if (toplists.length > 0) {
      setSelectedId(toplists[0].id)
    }
  }, [toplistId, toplists])

  return {
    selectedId,
    toplists,
    setSelectedId,
  }
}
