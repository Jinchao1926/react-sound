import React, { FC, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useToplistsQuery } from '@/hooks/playlist/useToplistsQuery'

import { ToplistCategory } from './components/ToplistCategory'
import { ToplistDetail } from './components/ToplistDetail'
import { ToplistDetailHeader } from './components/ToplistDetailHeader'
import { ToplistWrapper, ToplistLeft, ToplistRight } from './Toplist.styles'

export const Toplist: FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
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

  return (
    <ToplistWrapper className="wrap-v2">
      <ToplistLeft>
        <ToplistCategory id={selectedId} />
      </ToplistLeft>
      {selectedId && (
        <ToplistRight>
          <ToplistDetailHeader id={selectedId} />
          <ToplistDetail id={selectedId} />
        </ToplistRight>
      )}
    </ToplistWrapper>
  )
}
