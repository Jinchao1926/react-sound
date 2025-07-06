import React, { FC } from 'react'

import { usePlaylistDetailQuery } from '@/hooks/playlist/usePlaylistDetailQuery'
import { useSelectedToplist } from '@/modules/Discover/pages/Toplist/hooks/useSelectedToplist'

import { ToplistCategory } from './components/ToplistCategory'
import { ToplistDetail } from './components/ToplistDetail'
import { ToplistDetailHeader } from './components/ToplistDetailHeader'
import { ToplistWrapper, ToplistLeft, ToplistRight } from './Toplist.styles'

export const Toplist: FC = () => {
  const { selectedId, toplists } = useSelectedToplist()
  const { data } = usePlaylistDetailQuery(selectedId)

  return (
    <ToplistWrapper className="wrap-v2">
      <ToplistLeft>
        <ToplistCategory id={selectedId} data={toplists} />
      </ToplistLeft>
      {data && (
        <ToplistRight>
          <ToplistDetailHeader playlist={data} />
          <ToplistDetail playlist={data} />
        </ToplistRight>
      )}
    </ToplistWrapper>
  )
}
