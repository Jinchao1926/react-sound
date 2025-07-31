import { useEffect, useState } from 'react'

import { useToplistsQuery } from '@/hooks/recommend/useToplistsQuery'
import { useUrlParams } from '@/hooks/useUrlParams'
import { TopPlaylist } from '@/types/playlist'

export const useSelectedToplist = () => {
  const queryParams = useUrlParams()
  const toplistId = queryParams.get('id')
  const { data: toplists } = useToplistsQuery()

  const [selectedToplist, setSelectedToplist] = useState<
    TopPlaylist | undefined
  >(undefined)

  useEffect(() => {
    if (toplistId) {
      const selected = toplists.find((item) => item.id === Number(toplistId))
      setSelectedToplist(selected)
    } else if (toplists.length > 0) {
      setSelectedToplist(toplists[0])
    }
  }, [toplistId, toplists])

  return {
    selectedToplist,
    toplists,
  }
}
